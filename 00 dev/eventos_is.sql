-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2019 a las 21:20:53
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventos_is`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `idActividad` int(10) UNSIGNED NOT NULL,
  `nombreActividad` varchar(150) NOT NULL,
  `idUsuario_fk` int(10) UNSIGNED NOT NULL,
  `idEvento_fk` int(10) UNSIGNED NOT NULL,
  `idCategoriaActividad_fk` int(10) UNSIGNED NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `noCupos` int(11) DEFAULT NULL,
  `estado` enum('0','1') NOT NULL DEFAULT '1',
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`idActividad`, `nombreActividad`, `idUsuario_fk`, `idEvento_fk`, `idCategoriaActividad_fk`, `fechaInicio`, `fechaFin`, `descripcion`, `noCupos`, `estado`, `fechaRegistro`) VALUES
(1, 'Taller de arduino', 1, 1, 1, '2019-08-28', '2019-08-28', 'Taller de arduino impartido por el Ing. Prueba.', NULL, '1', '2019-08-27 19:13:37'),
(2, 'Seminario Jedi', 1, 1, 2, '2019-08-01', '2019-08-31', 'Seminario para reconocer fácilmente a los Sith.', NULL, '1', '2019-08-27 19:20:43'),
(9, 'Actividad 03', 3, 1, 1, '2019-10-01', '2019-10-31', 'Actividad 03', 20, '1', '2019-10-31 17:59:03'),
(10, 'Actividad 04', 3, 1, 1, '2019-10-01', '2019-10-31', 'Actividad 04', 20, '1', '2019-10-31 18:08:24'),
(11, 'Actividad 05', 3, 1, 1, '2019-12-31', '2019-12-31', 'Actividad 05', 20, '1', '2019-10-31 18:13:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_asistencia`
--

CREATE TABLE `actividad_asistencia` (
  `idActividad_fk` int(10) UNSIGNED NOT NULL,
  `idUsuario_fk` int(10) UNSIGNED NOT NULL,
  `asistio` enum('0','1') DEFAULT NULL,
  `rutaDiploma` text DEFAULT NULL,
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividad_asistencia`
--

INSERT INTO `actividad_asistencia` (`idActividad_fk`, `idUsuario_fk`, `asistio`, `rutaDiploma`, `fechaRegistro`) VALUES
(1, 2, '0', 'https://localhost/diploma.pdf', '2019-08-27 19:21:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_responsable`
--

CREATE TABLE `actividad_responsable` (
  `idActividad_fk` int(10) UNSIGNED NOT NULL,
  `idUsuario_fk` int(10) UNSIGNED NOT NULL,
  `trabajoRealizado` varchar(500) DEFAULT NULL,
  `totalHoras` int(11) DEFAULT NULL,
  `estado` enum('0','1') NOT NULL DEFAULT '1',
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividad_responsable`
--

INSERT INTO `actividad_responsable` (`idActividad_fk`, `idUsuario_fk`, `trabajoRealizado`, `totalHoras`, `estado`, `fechaRegistro`) VALUES
(1, 1, '- Organización del evento', 8, '1', '2019-08-27 19:19:22'),
(1, 2, '- Compra de insumos.', 2, '1', '2019-08-27 19:19:22'),
(2, 1, '- Organización del evento.', 8, '1', '2019-08-27 19:21:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_actividad`
--

CREATE TABLE `categoria_actividad` (
  `idCategoriaActividad` int(10) UNSIGNED NOT NULL,
  `categoriaActividad` varchar(100) NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_actividad`
--

INSERT INTO `categoria_actividad` (`idCategoriaActividad`, `categoriaActividad`, `fechaRegistro`) VALUES
(1, 'Taller', '2019-08-27 19:12:34'),
(2, 'Seminario', '2019-08-27 19:12:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(10) UNSIGNED NOT NULL,
  `nombreEvento` varchar(300) NOT NULL,
  `idUsuario_fk` int(10) UNSIGNED NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime NOT NULL,
  `estado` enum('0','1') NOT NULL DEFAULT '1',
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idEvento`, `nombreEvento`, `idUsuario_fk`, `fechaInicio`, `fechaFin`, `estado`, `fechaRegistro`) VALUES
(1, 'Semana de la carrera IS', 1, '2019-08-01 00:00:00', '2019-08-31 00:00:00', '1', '2019-08-27 19:11:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recurso`
--

CREATE TABLE `recurso` (
  `idRecurso` int(10) UNSIGNED NOT NULL,
  `idTipoRecurso_fk` int(10) UNSIGNED NOT NULL,
  `idActividad_fk` int(10) UNSIGNED NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_recurso`
--

CREATE TABLE `tipo_recurso` (
  `idTipoRecurso` int(10) UNSIGNED NOT NULL,
  `tipoRecurso` varchar(50) NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `idTipoUsuario` int(10) UNSIGNED NOT NULL,
  `tipoUsuario` varchar(50) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`idTipoUsuario`, `tipoUsuario`, `fechaRegistro`) VALUES
(1, 'admin', '2019-08-27 19:06:13'),
(2, 'organizador', '2019-08-27 19:06:13'),
(3, 'coordinador', '2019-08-27 19:08:25'),
(4, 'apoyo', '2019-08-27 19:08:25'),
(5, 'participante', '2019-08-27 19:08:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `idTipoUsuario_fk` int(10) UNSIGNED NOT NULL DEFAULT 4,
  `numCuentaEmpleado` int(15) NOT NULL,
  `nombres` varchar(150) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `contrasenia` varchar(300) NOT NULL,
  `estado` enum('0','1') NOT NULL DEFAULT '1',
  `fechaRegistro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idTipoUsuario_fk`, `numCuentaEmpleado`, `nombres`, `apellidos`, `correo`, `telefono`, `contrasenia`, `estado`, `fechaRegistro`) VALUES
(1, 2, 0, 'Prueba', 'prueba', 'prueba@unah.hn', 12345678, 'kjgsfasdklfhasldfhasdhfasjkdfhaksdf76fs8a7d6fs', '1', '2019-08-27 19:11:08'),
(2, 4, 0, 'Apoyo 1', 'Apoyo 1', 'apoyo1@unah.hn', 12345678, 'gdfgd65fg4df56g4d5fg4ds56fg465dfg456dsf4g56dsf4g65sdf', '1', '2019-08-27 19:14:19'),
(3, 3, 0, 'Test', 'Test', 'test@unah.hn', 88998899, '$2b$10$TxdgkBBiYrbLNlAjok056uKEG.6WQ2.q3vtmwO7pkk4L2e7P7dZT.', '1', '2019-10-30 16:32:51'),
(4, 1, 0, 'test2', 'test2', 'test2@unah.hn', 88998899, '$2b$10$FljA7nz8KiKK337lwY5Y/OIsN.WNOi.kWMRB6gjoFQUcmJ7VocyR.', '1', '2019-10-30 16:34:38');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`idActividad`),
  ADD KEY `FK_evento_actividad` (`idEvento_fk`),
  ADD KEY `FK_usuario_actividad` (`idUsuario_fk`),
  ADD KEY `FK_categoriaactividad_actividad` (`idCategoriaActividad_fk`);

--
-- Indices de la tabla `actividad_asistencia`
--
ALTER TABLE `actividad_asistencia`
  ADD PRIMARY KEY (`idActividad_fk`,`idUsuario_fk`),
  ADD KEY `FK_actividadasistencia_usuario` (`idUsuario_fk`);

--
-- Indices de la tabla `actividad_responsable`
--
ALTER TABLE `actividad_responsable`
  ADD PRIMARY KEY (`idActividad_fk`,`idUsuario_fk`),
  ADD KEY `FK_actividadresponsable_usuario` (`idUsuario_fk`);

--
-- Indices de la tabla `categoria_actividad`
--
ALTER TABLE `categoria_actividad`
  ADD PRIMARY KEY (`idCategoriaActividad`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`),
  ADD KEY `FK_usuario_evento` (`idUsuario_fk`);

--
-- Indices de la tabla `recurso`
--
ALTER TABLE `recurso`
  ADD PRIMARY KEY (`idRecurso`),
  ADD KEY `FK_tiporecurso_recurso` (`idTipoRecurso_fk`),
  ADD KEY `FK_actividad_recurso` (`idActividad_fk`);

--
-- Indices de la tabla `tipo_recurso`
--
ALTER TABLE `tipo_recurso`
  ADD PRIMARY KEY (`idTipoRecurso`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`idTipoUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `FK_tipousuario_usuario` (`idTipoUsuario_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `idActividad` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categoria_actividad`
--
ALTER TABLE `categoria_actividad`
  MODIFY `idCategoriaActividad` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `recurso`
--
ALTER TABLE `recurso`
  MODIFY `idRecurso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_recurso`
--
ALTER TABLE `tipo_recurso`
  MODIFY `idTipoRecurso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `idTipoUsuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `FK_categoriaactividad_actividad` FOREIGN KEY (`idCategoriaActividad_fk`) REFERENCES `categoria_actividad` (`idCategoriaActividad`),
  ADD CONSTRAINT `FK_evento_actividad` FOREIGN KEY (`idEvento_fk`) REFERENCES `evento` (`idEvento`),
  ADD CONSTRAINT `FK_usuario_actividad` FOREIGN KEY (`idUsuario_fk`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `actividad_asistencia`
--
ALTER TABLE `actividad_asistencia`
  ADD CONSTRAINT `FK_actividad_actividadactividad` FOREIGN KEY (`idActividad_fk`) REFERENCES `actividad` (`idActividad`),
  ADD CONSTRAINT `FK_actividadasistencia_usuario` FOREIGN KEY (`idUsuario_fk`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `actividad_responsable`
--
ALTER TABLE `actividad_responsable`
  ADD CONSTRAINT `FK_actividad_actividadresponsable` FOREIGN KEY (`idActividad_fk`) REFERENCES `actividad` (`idActividad`),
  ADD CONSTRAINT `FK_actividadresponsable_usuario` FOREIGN KEY (`idUsuario_fk`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `FK_usuario_evento` FOREIGN KEY (`idUsuario_fk`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `recurso`
--
ALTER TABLE `recurso`
  ADD CONSTRAINT `FK_actividad_recurso` FOREIGN KEY (`idActividad_fk`) REFERENCES `actividad` (`idActividad`),
  ADD CONSTRAINT `FK_tiporecurso_recurso` FOREIGN KEY (`idTipoRecurso_fk`) REFERENCES `tipo_recurso` (`idTipoRecurso`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_tipousuario_usuario` FOREIGN KEY (`idTipoUsuario_fk`) REFERENCES `tipo_usuario` (`idTipoUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
