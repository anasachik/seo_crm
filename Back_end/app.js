const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
var mySql = require('mysql');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
// const { sign } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { checkToken } = require("./auth/token_validation");
require("dotenv").config();

const { exec } = require('child_process');
// var execSync = require('exec-sync');

const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const e = require('express');
const { error } = require('console');

// -> Mysql connect
var con = mySql.createPool({
  connectionLimit : 10,
    host: process.env.HOST_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

// -> directory global
global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

/* 
    All what you need to create a user is to call 
    http://localhost:3000/api/createUser
    
*/
app.post('/api/createUser', checkToken, (req, res) => {
    var newUserInfo = req.body.newUser;
    var newImportantInfo = req.body.newImportantInformation;

    con.query(" SELECT Id_User as id FROM users WHERE Full_Name='" + newUserInfo.Full_Name + "'", function (err, result) {
        // console.log(result.length == 0);
        var messageReponse;
        if (result.length == 0) {
            var sqlInsertUser = "INSERT INTO users (Id_User, Full_Name, Company_Name, Company_Url, Phone, Email) VALUES (NULL,'" + newUserInfo.Full_Name + "', '" + newUserInfo.Company_Name + "', '" + newUserInfo.Company_Url + "', '" + newUserInfo.Phone + "', '" + newUserInfo.Email + "')";
            con.query(sqlInsertUser, function (err, result) {
                if (err) {
                    messageReponse = err;
                    // updateMessage(err);
                    return;
                }
                else {
                    // console.log("1 record inserted");
                    var sqlGetUserId = " SELECT Id_User as id FROM users WHERE Full_Name='" + newUserInfo.Full_Name + "'";
                    con.query(sqlGetUserId, function (err, result, fields) {
                        if (err) {
                            messageReponse = err;
                            // updateMessage(err);
                            return;
                        }
                        else {
                            // console.log(result[0].id);
                            var idUser = result[0].id;
                            var sqlInsertImportantInfo = "INSERT INTO important_elements " +
                                "(Id_Important_Element, Date_Update, Framework, Domain_Age, Servers, CDN, Hierarchy, Click_Depth, Internal_Link, Number_Page, Page_Load_Speed, Avg_Word_Per_Page, Avg_Internal_Link, Avg_HTag, Domain_Authority, Avg_External_Link, Number_Referring_Domains, Number_Ip, Number_Backlinks, Publishing_Rate, Id_Competitor, Id_User)" +
                                "VALUES (NULL, '" + newImportantInfo.Date_Update
                                + "', '" + newImportantInfo.Framework
                                + "', '" + newImportantInfo.Domain_Age
                                + "', '" + newImportantInfo.Servers
                                + "', '" + newImportantInfo.CDN
                                + "', '" + newImportantInfo.Hierarchy
                                + "', '" + newImportantInfo.Click_Depth
                                + "', '" + newImportantInfo.Internal_Link
                                + "', '" + newImportantInfo.Number_Page
                                + "', '" + newImportantInfo.Page_Load_Speed
                                + "', '" + newImportantInfo.Avg_Word_Per_Page
                                + "', '" + newImportantInfo.Avg_Internal_Link
                                + "',  '" + newImportantInfo.Avg_HTag
                                + "', '" + newImportantInfo.Domain_Authority
                                + "', '" + newImportantInfo.Avg_External_Link
                                + "', '" + newImportantInfo.Number_Referring_Domains
                                + "', '" + newImportantInfo.Number_Ip
                                + "', '" + newImportantInfo.Number_Backlinks
                                + "', '" + newImportantInfo.Publishing_Rate
                                + "', NULL, '" + idUser
                                + "')";
                            ;
                            con.query(sqlInsertImportantInfo, function (err, result) {
                                if (err) {
                                    messageReponse = err;
                                    // updateMessage(err);
                                    return;
                                }
                                else {
                                    // console.log("1 record inserted");
                                    messageReponse = 'done';
                                }
                            });
                        }
                    });
                }
            });
            messageReponse = 'done';
            // updateMessage('done');
        } else {
            messageReponse = 'User already exists';
            // updateMessage('User already exists');
        }
        // console.log(messageReponse);
        res.status(200).json({
            message: messageReponse,
        });
    });

});

/* 
    All what you need to get all users info is to call 
    http://localhost:3000/api/Users
    
*/
app.get('/api/Users',checkToken, (req, res) => {
    con.query(" SELECT * FROM users", function (err, result) {
        if (err) {
            res.status(404).json({
                message: 'Server Crashed !',
            });
        } else {
            res.status(200).json({
                message: 'Data EXISTS !',
                users: result
            });
        }

    });

});

/* 
    All what you need to get all users Element is to call 
    http://localhost:3000/api/UsersElement
    
*/
app.get('/api/UsersWithElement', checkToken, (req, res) => {
    var userId = req.query.userId;
    // console.log("SELECT * FROM users inner JOIN important_elements ON users.Id_User = important_elements.Id_User where users.Id_User='"+userId+"'and important_elements.Id_Competitor IS NULL ORDER BY important_elements.Date_Update DESC limit 2");
    con.query("SELECT * FROM users inner JOIN important_elements ON users.Id_User = important_elements.Id_User where users.Id_User='" + userId + "'and important_elements.Id_Competitor IS NULL ORDER BY important_elements.Date_Update DESC limit 10", function (err, result) {
        if (err) {
            res.status(404).json({
                message: 'Server Crashed !',
            });
        } else {
            res.status(200).json({
                message: 'Data EXISTS !',
                users: result
            });
        }

    });

});

/* 
    All what you need to modifier users info is to call 
    http://localhost:3000/api/UpdateUserInfo
    
*/
app.post('/api/UpdateUserInfo', checkToken, (req, res) => {
    var user = req.body.user;
    // console.log(user);
    // console.log(`UPDATE users SET Full_Name = '${user.Full_Name}', Company_Name = '${user.Company_Name}', Company_Url = '${user.Company_Url}', Phone = '${user.Phone}', Email = '${user.Email}' WHERE users.Id_User = `+user.id);
    con.query(`UPDATE users SET Full_Name = '${user.Full_Name}', Company_Name = '${user.Company_Name}', Company_Url = '${user.Company_Url}', Phone = '${user.Phone}', Email = '${user.Email}' WHERE users.Id_User = ` + user.id, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'Something worng happen, Name already exsist !',
            });
        } else {
            res.status(200).json({
                message: 'Data Updated !',
            });
        }

    });
});

/* 
    All what you need to modifier users important Element is to call 
    http://localhost:3000/api/UpdateUserImportantElement
    
*/
app.post('/api/UpdateUserImportantElement', checkToken, (req, res) => {
    var userId = req.body.userId;
    var importantElement = req.body.importantElement;
    var currentDate = new Date();
    // console.log(currentDate);
    con.query(`INSERT INTO important_elements (
        Date_Update, Framework, Domain_Age, 
        Servers, CDN, Hierarchy, Click_Depth, 
        Internal_Link, Number_Page, Page_Load_Speed, 
        Avg_Word_Per_Page, Avg_Internal_Link, Avg_HTag, 
        Domain_Authority, Avg_External_Link, Number_Referring_Domains, 
        Number_Ip, Number_Backlinks, Publishing_Rate, 
        Id_User) 
        VALUES (
            ${con.escape(currentDate)},
            '${importantElement.Framework}',
            '${importantElement.Domain_Age}',
            '${importantElement.Servers}', 
            '${importantElement.CDN}', 
            '${importantElement.Hierarchy}', 
            ${importantElement.Click_Depth}, 
            ${importantElement.Internal_Link}, 
            ${importantElement.Number_Page}, 
            ${importantElement.Page_Load_Speed}, 
            ${importantElement.Avg_Word_Per_Page}, 
            ${importantElement.Avg_Internal_Link}, 
            ${importantElement.Avg_HTag}, 
            ${importantElement.Domain_Authority}, 
            ${importantElement.Avg_External_Link}, 
            ${importantElement.Number_Referring_Domains}, 
            ${importantElement.Number_Ip}, 
            ${importantElement.Number_Backlinks}, 
            ${importantElement.Publishing_Rate},
             ${userId})`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'Something worng happen, Name already exsist !',
            });
        } else {
            res.status(200).json({
                message: 'Data Important Element Updated !',
            });
        }
    });
});

/* 
    All what you need to modifier users important Element is to call 
    http://localhost:3000/api/CreateNewConcurrence
    
*/
app.post('/api/CreateNewConcurrence', checkToken, (req, res) => {
    var userId = req.body.userId;
    var concurrence = req.body.concurrence;
    var importantElement = req.body.importantElement;
    var currentDate = new Date();
    // console.log(`INSERT INTO competitor (Company_Name, Company_Url, Id_User)
    //      VALUES ('${concurrence.Company_Name}','${concurrence.Company_Url}', ${userId})`);
    // console.log(`SELECT * FROM competitor WHERE Company_Name= '${concurrence.Company_Name}'`)

    con.query(`INSERT INTO competitor (Company_Name, Company_Url, Id_User)
    VALUES ('${concurrence.Company_Name}','${concurrence.Company_Url}', ${userId})`, function (err, result) {
        var messageReponse = 'Concurrence was being add !';
        if (err) {
            messageReponse = 'Something worng happen, Name already exsist !';
        } else {
            con.query(`SELECT * FROM competitor WHERE Company_Name= '${concurrence.Company_Name}'`, function (err, result) {
                if (err) {
                    messageReponse = 'Something worng happen, competitore faild!';
                } else {
                    if (result[0].Id_Competitor) {
                        con.query(`INSERT INTO important_elements (
                            Date_Update, Framework, Domain_Age, 
                            Servers, CDN, Hierarchy, Click_Depth, 
                            Internal_Link, Number_Page, Page_Load_Speed, 
                            Avg_Word_Per_Page, Avg_Internal_Link, Avg_HTag, 
                            Domain_Authority, Avg_External_Link, Number_Referring_Domains, 
                            Number_Ip, Number_Backlinks, Publishing_Rate,Id_Competitor,
                            Id_User) 
                            VALUES (
                                ${con.escape(currentDate)},
                                '${importantElement.Framework}',
                                '${importantElement.Domain_Age}',
                                '${importantElement.Servers}', 
                                '${importantElement.CDN}', 
                                '${importantElement.Hierarchy}', 
                                ${importantElement.Click_Depth}, 
                                ${importantElement.Internal_Link}, 
                                ${importantElement.Number_Page}, 
                                ${importantElement.Page_Load_Speed}, 
                                ${importantElement.Avg_Word_Per_Page}, 
                                ${importantElement.Avg_Internal_Link}, 
                                ${importantElement.Avg_HTag}, 
                                ${importantElement.Domain_Authority}, 
                                ${importantElement.Avg_External_Link}, 
                                ${importantElement.Number_Referring_Domains}, 
                                ${importantElement.Number_Ip}, 
                                ${importantElement.Number_Backlinks}, 
                                ${importantElement.Publishing_Rate},
                                ${result[0].Id_Competitor},
                                 ${userId})`, function (err, result) {
                            if (err) {
                                messageReponse = 'Something worng happen, Important elemnet doesnt added !';
                            } else {
                                messageReponse = 'Concurrence add !';
                            }
                        });
                    }
                }
            });
        }
        // console.log(messageReponse)
        res.status(200).json({
            message: messageReponse,
        });
    });
});

/* 
    All what you need to get all comptitor info is to call 
    http://localhost:3000/api/CompetitorsInfo?userId=6
    
*/

app.get('/api/CompetitorsInfo', checkToken, (req, res) => {
    var userId = req.query.userId;
    // console.log(`SELECT * FROM important_elements INNER Join competitor on competitor.Id_Competitor=important_elements.Id_Competitor Where important_elements.Id_User = ${userId} AND (important_elements.Id_Competitor IS NOT Null) ORDER BY important_elements.Date_Update DESC`)
    con.query(`SELECT * FROM important_elements INNER Join competitor on competitor.Id_Competitor=important_elements.Id_Competitor Where competitor.Id_User = ${userId} AND (important_elements.Id_Competitor IS NOT Null) ORDER BY important_elements.Date_Update DESC`, function (err, result) {
        var resultToSend = []
        if (err) {
            res.status(200).json({
                message: 'DATA BASE CRASHED!',
                concurrence: []
            });
        } else {
            for (let i = 0; i < result.length; i++) {
                var checkIfExsist = true;
                for (let j = 0; j < resultToSend.length; j++) {
                    if (resultToSend[j].Id_Competitor == result[i].Id_Competitor) {
                        resultToSend[j] = result[i]
                        checkIfExsist = false;
                    }
                }
                if (checkIfExsist) {
                    resultToSend.push(result[i]);
                }
            }

            res.status(200).json({
                message: 'Data EXISTS !',
                concurrence: resultToSend
            });
        }

    });

});

/* 
    All what you need to get all comptitor info is to call 
    http://localhost:3000/api/DeleteCompetitor?competitorId=6
    
*/
app.delete('/api/DeleteCompetitor', checkToken, (req, res) => {
    var competitorId = req.query.competitorId;
    // console.log(competitorId);
    // console.log(`DELETE FROM important_elements WHERE important_elements.Id_Competitor = ${competitorId} `);
    con.query(`DELETE FROM important_elements WHERE important_elements.Id_Competitor = ${competitorId} `, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'important element wasn\'t being deleted !',
            });
        } else {
            // console.log(`DELETE FROM competitor WHERE competitor.Id_Competitor = ${competitorId} `)
            con.query(`DELETE FROM competitor WHERE competitor.Id_Competitor = ${competitorId} `, function (err, result) {

                if (err) {
                    res.status(200).json({
                        message: 'compititor info Deleted !',
                    });
                } else {
                    res.status(200).json({
                        message: 'all info compititor wase being deleted !',
                    });
                }
            });

        }

    });
});

/* 
    All what you need to modifier users important Element is to call 
    http://localhost:3000/api/CreateNewTask and send body
    
*/
app.post('/api/CreateNewTask', checkToken, (req, res) => {
    // Name_Task Type_Task Checked Id_User
    var userId = req.body.userId;
    var newTask = req.body.newTask;
    // console.log(userId, newTask);

    var currentDate = new Date();
    var checkedStatus = false;

    con.query(`INSERT INTO website_task (Name_Task, Type_Task, Checked, Date_Ajoute, Date_Expiration, Id_User) 
        VALUES ('${newTask.Name_Task}','${newTask.Type_Task}', ${checkedStatus}, ${con.escape(currentDate)} , '${newTask.End}' , ${userId})`,
        function (err, result) {
            // var messageReponse = 'task was being add !';
            if (err) {
                res.status(200).json({
                    message: "Something worng happen!",
                });
            } else {
                res.status(200).json({
                    message: "task was being added",
                });
            }
        });
});

/* 
    All what you need to modifier users important Element is to call 
    http://localhost:3000/api/UsersTask?userId=1
    
*/
app.get('/api/UsersTask', checkToken, (req, res) => {
    var userId = req.query.userId;

    con.query(`SELECT * FROM website_task where Id_User=${userId}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'DataBase Crashed !',
            });
        } else {
            res.status(200).json({
                message: 'Data EXISTS !',
                taskUser: result
            });
        }

    });

});

/* 
    All what you need to delete task is to call 
    http://localhost:3000/api/DeleteTask?taskId=6
    
*/
app.delete('/api/DeleteTask', checkToken, (req, res) => {
    var taskId = req.query.taskId;
    con.query(`DELETE FROM website_task WHERE website_task.Id_Task =${taskId}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'task wasn\'t being deleted !',
            });
        } else {
            res.status(200).json({
                message: 'task was being deleted !',
            });
        }

    });
});


/* 
    All what you need to update task status is to call 
    http://localhost:3000/api/CheckTask?task=[object]
    
*/
app.post('/api/CheckTask', checkToken, (req, res) => {
    var taskId = req.body.task.id_task;
    var checkStatus = req.body.task.Checked;
    if (checkStatus) {
        checkStatus = 0
    } else {
        checkStatus = 1
    }
    // console.log(`UPDATE website_task SET Checked = '${checkStatus}' WHERE website_task.Id_Task =${taskId}`)
    con.query(`UPDATE website_task SET Checked = '${checkStatus}' WHERE website_task.Id_Task =${taskId}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'task wasn\'t being updated !',
            });
        } else {
            res.status(200).json({
                message: 'task was being updated !',
            });
        }

    });
});

/* 
    All what you need to upload xls file to mysql database is to call 
    http://localhost:3000/api/uploadXlsFile?userId=1
    
*/
app.post('/api/uploadXlsFile', upload.single("uploadfile"), async (req, res) => {
    var userId = req.query.userId;
    try {
        importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename, userId).then(
            data => {
                // console.log(data)
                res.status(200).json({
                    message: data,
                    file: req.file
                })
            }
            // 
        );
    } catch (error) {
        res.status(200).json({
            message: "error upload",
        });
    }

});

// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath, userId) {
    // File path.
    return new Promise(function (resolve, reject) {
        readXlsxFile(filePath).then((rows) => {
            // Remove Header ROW
            rows.shift();
            if (userId) {
                for (let index = 0; index < rows.length; index++) {
                    // console.log(`SELECT * FROM keyword where Name_Keyword= "${rows[index][0]}" where Id_User =${userId}`)
                    con.query(`SELECT * FROM keyword where Name_Keyword= "${rows[index][0]}" and Id_User =${userId}`, function (err, result) {
                        if (err) {
                            // res.status(200).json({
                            //     message: 'data Base error !',
                            // });
                            // return "data base error"

                            resolve("data base error")
                        } else {
                            if (result.length > 0) {
                                var currentDate = new Date();
                                var impressions = 0;
                                if (rows[index][3] != 'N/D') {
                                    impressions = rows[index][4]
                                }
                                var clicks = 0;
                                if (rows[index][4] != 'N/D') {
                                    clicks = rows[index][4]
                                }
                                // console.log(`INSERT INTO keyword_update 
                                // (Date_Update, Number_Search, Google_Position, Impression, Clicks, Id_Keyword)
                                // VALUES (${con.escape(currentDate)}, ${rows[index][1]}, ${rows[index][2]}, ${impressions}, ${clicks}, ${result[0].Id_Keyword})`)
                                con.query(`INSERT INTO keyword_update 
                        (Date_Update, Number_Search, Google_Position, Impression, Clicks, Id_Keyword)
                        VALUES (${con.escape(currentDate)}, ${rows[index][1]}, ${rows[index][2]}, ${impressions}, ${clicks}, ${result[0].Id_Keyword})`, function (err, result) {
                                    if (err) {
                                        // console.log("weslt 4");
                                        // console.log('row not add')
                                        // return "row not add"
                                        // resolve("row not add")
                                    } else {
                                        if (index == rows.length - 1) {
                                            resolve("insert keyword update")
                                        }
                                    }
                                })
                            } else {
                                // console.log(`INSERT INTO keyword ( Name_Keyword, Source_Data, Id_User) VALUES ( "${rows[index][0]}", 'upload', ${userId})`)
                                con.query(`INSERT INTO keyword ( Name_Keyword, Source_Data, Id_User) VALUES ( "${rows[index][0]}", 'upload', ${userId})`, function (err, result) {
                                    if (err) {
                                        // res.status(200).json({
                                        //     message: 'insert Doesn\'t work !',
                                        // });
                                        // return "insert keyword"
                                        if (index == rows.length - 1) {
                                            resolve("keyword word exists")
                                        }
                                    } else {
                                        con.query(`SELECT * FROM keyword where Name_Keyword= "${rows[index][0]}"`, function (err, result) {
                                            if (result.length > 0) {
                                                var currentDate = new Date();
                                                var impressions = 0;
                                                if (rows[index][3] != 'N/D') {
                                                    impressions = rows[index][4]
                                                }
                                                var clicks = 0;
                                                if (rows[index][4] != 'N/D') {
                                                    clicks = rows[index][4]
                                                }
                                                con.query(`INSERT INTO keyword_update 
                                        (Date_Update, Number_Search, Google_Position, Impression, Clicks, Id_Keyword)
                                        VALUES (${con.escape(currentDate)}, ${rows[index][1]}, ${rows[index][2]}, ${impressions}, ${clicks}, ${result[0].Id_Keyword})`, function (err, result) {
                                                    if (err) {
                                                        // console.log('row not add')
                                                        // return err
                                                        resolve("row not add")
                                                    } else {
                                                        // return "insert keyword update"
                                                        if (index == rows.length - 1) {
                                                            resolve("insert keyword update")
                                                        }
                                                    }
                                                })
                                            }
                                        });
                                    }
                                })
                            }
                        }
                    });
                }
            }

        })
    });
}

/* 
    All what you need to get all keyword is to call 
    http://localhost:3000/api/getKeywords?userId=1
    
*/
app.get('/api/getKeywords', checkToken, (req, res) => {
    var userId = req.query.userId;
    con.query(`SELECT ku1.* ,k.Name_keyword , k.Source_Data , k.Id_User FROM keyword_update as ku1 INNER JOIN
    (
        SELECT Id_Keyword, MAX(Date_Update) AS max_time
        FROM keyword_update
        GROUP BY Id_Keyword
    ) ku2  ON ku1.Id_Keyword = ku2.Id_Keyword AND ku1.Date_Update = ku2.max_time
    INNER JOIN keyword as k on  
            k.Id_Keyword = ku1.Id_Keyword
    WHERE k.Id_User = ${userId}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'Data doesn\'t EXISTS !',
            });
        } else {
            res.status(200).json({
                message: 'Data EXISTS !',
                keywords: result
            });
        }
    });
})

/* 
    All what you need to get all keyword info is to call 
    http://localhost:3000/api/getKeywordsAllInfo?keyId=3&limit=10
    
*/
app.get('/api/getKeywordsAllInfo', checkToken, (req, res) => {
    var keyId = req.query.keyId;
    var limit = req.query.limit

    con.query(`SELECT ku.*,k.Name_Keyword, k.Source_Data FROM keyword_update as ku INNER join keyword as k
     on ku.Id_Keyword = k.Id_Keyword WHERE k.Id_Keyword=${keyId} ORDER BY ku.Date_Update DESC LIMIT ${limit}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'Data doesn\'t EXISTS !',
            });
        } else {
            res.status(200).json({
                message: 'Data EXISTS !',
                keywords: result
            });
        }
    });
})

/* 
    All what you need to delete keyword is to call 
    http://localhost:3000/api/deletKeyword?keyId=3
    
*/
app.delete('/api/deletKeyword', checkToken, (req, res) => {
    var keyId = req.query.keyId;
    con.query(`DELETE FROM keyword_update WHERE Id_Keyword=${keyId}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'keywordUpdate wasn\'t being deleted !',
            });
        } else {
            con.query(`DELETE FROM keyword WHERE Id_Keyword=${keyId}`, function (err, result) {
                if (!err) {
                    res.status(200).json({
                        message: 'KeyWord was being deleted !',
                    });
                }

            })
        }
    });
});

/* 
    All what you need to add keyword is to call 
    http://localhost:3000/api/addKeyword?userId=1
    
*/
app.post('/api/addKeyword', checkToken, (req, res) => {
    var userId = req.query.userId
    var keyword = req.body.keyword;
    con.query(`INSERT INTO keyword ( Name_Keyword, Source_Data, Id_User) VALUES ( "${keyword.Name_keyword}", 'addManually', ${userId})`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'insert Doesn\'t work !',
            });
        } else {
            con.query(`SELECT * FROM keyword where Name_Keyword= "${keyword.Name_keyword}"`, function (err, result) {
                if (result.length > 0) {
                    var currentDate = new Date();
                    con.query(`INSERT INTO keyword_update 
                (Date_Update, Number_Search, Google_Position, Impression, Clicks, Id_Keyword)
                VALUES (${con.escape(currentDate)}, ${keyword.Number_Search}, ${keyword.Google_Position},
                ${keyword.Impression}, ${keyword.Clicks}, ${result[0].Id_Keyword})`, function (err, result) {
                        if (!err) {
                            res.status(200).json({
                                message: 'keyWord was being add !',
                            });
                        }
                    })
                }
            });
        }
    })
})

/* 
    All what you need to get all keyword is to call 
    http://localhost:3000/api/updateKeyword
    
*/
app.post('/api/updateKeyword', checkToken, (req, res) => {
    var keyword = req.body.keyword;
    var currentDate = new Date();
    // con.query(`UPDATE keyword SET Name_Keyword = '${keyword.Name_keyword}' WHERE keyword.Id_Keyword = ${keyword.Id_Keyword}`,
    // function(err,result){
    //     if(!err){

    //     }
    // })
    con.query(`INSERT INTO keyword_update 
            (Date_Update, Number_Search, Google_Position, Impression, Clicks, Id_Keyword)
            VALUES (${con.escape(currentDate)}, ${keyword.Number_Search},
            ${keyword.Google_Position}, ${keyword.Impression}, ${keyword.Clicks}, ${keyword.Id_Keyword})`,
        function (err, result) {
            if (!err) {
                res.status(200).json({
                    message: 'keyWord was being updated !',
                });
            }
        }
    );
});

/* 
    All what you need to get all baclinks is to call 
    http://localhost:3000/api/getBacklink
    
*/
app.get('/api/getBacklink', checkToken, (req, res) => {
    con.query(`SELECT * FROM backlink`, function (err, result) {
        if (!err) {
            res.status(200).json({
                message: 'backlink Exists !',
                backlink: result
            });
        }
    })
})

/* 
    All what you need to set traitement to keyword is to call 
    http://localhost:3000/api/addTraitementKeyword
    
*/
app.post('/api/addTraitementKeyword', checkToken, (req, res) => {
    var keywordId = req.body.keywordId;
    var BackLinkId = req.body.BackLinkId;
    var currentDate = new Date();
    con.query(`INSERT INTO traitement (Id_Keyword, Id_BackLink, Date_Traitement)
         VALUES (${keywordId}, ${BackLinkId}, ${con.escape(currentDate)})`,
        function (err, result) {
            if (!err) {
                res.status(200).json({
                    message: 'traitement was being added !',
                });
            }
        }
    );
});

/* 
    All what you need to add new backlink to keyword is to call 
    http://localhost:3000/api/createNewBacklink
    
*/
app.post('/api/createNewBacklink', checkToken, (req, res) => {
    var keywordId = req.body.keywordId;
    var backlink = req.body.backlink;
    var currentDate = new Date();
    con.query(`INSERT INTO backlink (Name_BackLink, Url_BackLink, Type_BackLink)
        VALUES ('${backlink.Name_BackLink}', '${backlink.Url_BackLink}', '${backlink.Type_BackLink}')`,
        function (err, result) {
            if (!err) {
                con.query(`SELECT * FROM backlink WHERE Name_BackLink='${backlink.Name_BackLink}'`, function (err, result) {
                    if (!err) {
                        con.query(`INSERT INTO traitement (Id_Keyword, Id_BackLink, Date_Traitement)
                            VALUES (${keywordId}, ${result[0].Id_BackLink}, ${con.escape(currentDate)})`,
                            function (err, result) {
                                if (!err) {
                                    res.status(200).json({
                                        message: 'traitement was being added !',
                                    });
                                }
                            }
                        );
                    }
                })
            }
        }
    );
});


/* 
    All what you need to get all traitement of backlink is to call 
    http://localhost:3000/api/getTraitementKeyword?keywordId
    
*/
app.get('/api/getTraitementKeyword', checkToken, (req, res) => {
    var keywordId = req.query.keywordId;
    con.query(`SELECT * FROM traitement INNER join backlink on backlink.Id_BackLink = traitement.Id_BackLink 
        WHERE traitement.Id_Keyword=${keywordId}`, function (err, result) {
        if (!err) {
            res.status(200).json({
                message: 'traitement Exists !',
                traitement: result
            });
        }
    })
})


/* 
    All what you need to insert keyword Task is to call 
    http://localhost:3000/api/addKeywordTask?keyId    
*/

app.post('/api/addKeywordTask', checkToken, (req, res) => {
    var keyId = req.query.keyId;
    var keyTask = req.body.keyTask
    var currentDate = new Date();

    con.query(`INSERT INTO keyword_task (Name_Task, Checked, Date_Ajoute, Date_Expiration, Id_Keyword)
        VALUES ('${keyTask.Name_Task}', false, ${con.escape(currentDate)} , '${keyTask.End}', ${keyId})`,
        function (err, result) {
            if (!err) {
                res.status(200).json({
                    message: 'keyWord Task was being add !',
                });
            }
        }
    );
});

/* 
    All what you need to get all keyWordTask of specifique keyId is to call 
    http://localhost:3000/api/getKeywordTask?keyId=
    
*/
app.get('/api/getKeywordTask', checkToken, (req, res) => {
    var keyId = req.query.keyId;
    con.query(`SELECT * FROM keyword_task where Id_Keyword=${keyId}`, function (err, result) {
        if (!err) {

            res.status(200).json({
                message: 'keyword task Exists !',
                keywordTask: result
            });
        }
    })
})

/* 
    All what you need to update task keyword status is to call 
    http://localhost:3000/api/CheckTaskKeyWord?task=[object]
    
*/
app.post('/api/CheckTaskKeyWord', checkToken, (req, res) => {
    var keyTaskId = req.body.keyTask.Id_KewordTask;
    var checkStatus = req.body.keyTask.Checked;
    if (checkStatus) {
        checkStatus = 0
    } else {
        checkStatus = 1
    }
    // console.log(`UPDATE keyword_task SET Checked = '${checkStatus}' WHERE keyword_task.Id_KewordTask = ${keyTaskId}`)
    con.query(`UPDATE keyword_task SET Checked = '${checkStatus}' WHERE keyword_task.Id_KewordTask = ${keyTaskId}`, function (err, result) {
        if (err) {
            res.status(200).json({
                message: 'task wasn\'t being updated !',
            });
        } else {
            res.status(200).json({
                message: 'task was being updated !',
            });
        }

    });
});

/* 
    All what you need to delete keyword task is to call 
    http://localhost:3000/api/deletKeywordTask?keyTaskIdyId=3
    
*/
app.delete('/api/deletKeywordTask', checkToken, (req, res) => {
    var keyTaskId = req.query.keyTaskId;
    // console.log(`DELETE FROM keyword_task WHERE keyword_task.Id_KewordTask =${keyTaskId}`)
    con.query(`DELETE FROM keyword_task WHERE keyword_task.Id_KewordTask =${keyTaskId}`, function (err, result) {
        if (!err) {
            res.status(200).json({
                message: 'keyword task was being deleted !',
            });
        }
    });
});

/* 
    All what you need to get all Notification keyTask is to call 
    http://localhost:3000/api/getNotificationKeyTask
    
*/
app.get('/api/getNotificationKeyTask', checkToken, (req, res) => {
    var currentDate = new Date();
    con.query(`SELECT * FROM keyword_task WHERE Date_Expiration=${con.escape(formatDate(currentDate))}`, function (err, result) {
        if (!err) {
            res.status(200).json({
                message: 'Notification Exists !',
                NotifcationKeyTask: result
            });
        }
    })
})

/* 
    All what you need to get all Notification websiteTask is to call 
    http://localhost:3000/api/getNotificationWebsiteTask
    
*/
app.get('/api/getNotificationWebsiteTask', checkToken, (req, res) => {
    var currentDate = new Date();
    con.query(`SELECT * FROM website_task WHERE Date_Expiration=${con.escape(formatDate(currentDate))}`, function (err, result) {
        if (!err) {
            res.status(200).json({
                message: 'Notification Exists !',
                NotificationWebsiteTask: result
            });
        }
    })
})
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    // d.getHours+d.getMinutes+d.getSeconds

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
app.post('/api/login', (req, res) => {
    con.query(
        `SELECT * FROM admin WHERE Email="${req.body.email}" `, function (err, result) {
            if (!err && result[0]) {
                resultCompare = bcrypt.compareSync(req.body.password, result[0].Password)
                if (resultCompare) {
                    const jsontoken = jwt.sign({ email: req.body.email }, process.env.JWT_KEY, { expiresIn: "1 days" });
                    res.status(200).json({
                        message: "login successfully",
                        token: jsontoken
                    });
                } else {
                    res.status(200).json({
                        message: "try another password",
                    });
                }
            } else {
                res.status(200).json({
                    message: "email doesn't exist",
                });
            }
        });
})

app.get('/api/getDataBase', (req, res) => {
    let dumpFile = 'dump.sql';
    var promise = new Promise(function (resolve, reject) {
        exec(`C:\/xampp\/mysql\/bin\/mysqldump.exe -u ${process.env.USER} --password=${process.env.PASSWORD} ${process.env.DB} > ${dumpFile}`,
            (err, stdout, stderr) => {
                if (err) {
                    reject(error);
                    console.error(`exec error: ${err}`);
                    return;
                }
                else {
                    resolve(stdout.trim());
                }
            });
    })
    promise.then(
        data => {
            const file = path.resolve(__dirname, `dump.sql`);
            res.download(file);
        }
    ).catch(
        error =>{
            res.send("file download error")
        }
    )
})

module.exports = app;
