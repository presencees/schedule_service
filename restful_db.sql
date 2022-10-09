-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: dbSchedule
-- Waktu pembuatan: 09 Okt 2022 pada 15.57
-- Versi server: 5.7.38
-- Versi PHP: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `services`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `participant`
--

CREATE TABLE `participant` (
  `participant_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `mahasiswa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `lecturer_name` varchar(50) NOT NULL,
  `subject_name` varchar(150) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `room` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `lecturer_name`, `subject_name`, `start_time`, `end_time`, `room`, `description`) VALUES
(1, 'Isidor Androletti', 'Fire Sprinkler System', '2022-01-13 00:00:00', '2021-11-03 00:00:00', 'Infiniti', 'Traumatic rupture of palmar ligament of right little finger at metacarpophalangeal and interphalangeal joint, sequela'),
(2, 'Dela Mallabar', 'Masonry', '2022-06-08 00:00:00', '2022-06-20 00:00:00', 'Mitsubishi', 'Influenza due to other identified influenza virus with other manifestations'),
(3, 'Micheal Dubbin', 'Temp Fencing, Decorative Fencing and Gates', '2022-07-16 00:00:00', '2022-04-10 00:00:00', 'Ferrari', 'Acne varioliformis'),
(4, 'Casi Packer', 'Fire Sprinkler System', '2022-09-14 00:00:00', '2022-07-14 00:00:00', 'Chrysler', 'Nondisplaced fracture of distal phalanx of unspecified great toe, subsequent encounter for fracture with nonunion'),
(5, 'Evelyn Claxson', 'Marlite Panels (FED)', '2021-10-26 00:00:00', '2021-12-14 00:00:00', 'Ford', 'Adverse effect of other primarily systemic and hematological agents'),
(6, 'Welch Sugars', 'Drywall & Acoustical (FED)', '2022-01-13 00:00:00', '2022-06-09 00:00:00', 'Porsche', 'Unspecified perichondritis of external ear'),
(7, 'Sam Haldane', 'Marlite Panels (FED)', '2021-11-09 00:00:00', '2022-08-16 00:00:00', 'Volkswagen', 'Poisoning by, adverse effect of and underdosing of amphetamines'),
(8, 'Minette Waleworke', 'Structural & Misc Steel Erection', '2022-01-11 00:00:00', '2021-10-03 00:00:00', 'Chevrolet', 'Other specified type of carcinoma in situ of right breast'),
(9, 'Lind Pauwel', 'Hard Tile & Stone', '2021-12-10 00:00:00', '2022-02-12 00:00:00', 'GMC', 'Pathological fracture, left radius, subsequent encounter for fracture with delayed healing'),
(10, 'Marcille Goseling', 'Fire Protection', '2022-03-22 00:00:00', '2022-08-28 00:00:00', 'Toyota', 'Burn with resulting rupture and destruction of unspecified eyeball, sequela');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`participant_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indeks untuk tabel `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `participant`
--
ALTER TABLE `participant`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
