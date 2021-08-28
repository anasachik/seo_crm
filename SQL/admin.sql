CREATE TABLE `admin` (
  `Id_Admin` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `admin` (`Id_Admin`, `Email`, `Password`) VALUES
(0, 'admin', '$2y$10$9vKKkq6oddysBA.rmwtNQenzqyg95wIxoNYo7DoEYUqlGEPIlwn9a');

ALTER TABLE `admin`
  ADD PRIMARY KEY (`Id_Admin`),
  ADD UNIQUE KEY `Email` (`Email`);
COMMIT;
