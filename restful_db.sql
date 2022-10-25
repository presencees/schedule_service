-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: dbSchedule
-- Waktu pembuatan: 25 Okt 2022 pada 16.53
-- Versi server: 5.7.40
-- Versi PHP: 8.0.19

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
-- Struktur dari tabel `participants`
--

CREATE TABLE `participants` (
  `participant_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `mahasiswa_id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `participants`
--

INSERT INTO `participants` (`participant_id`, `schedule_id`, `mahasiswa_id`, `full_name`) VALUES
(1, 11, 1, 'anto'),
(2, 12, 2, 'doni');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `lecturer_id` int(20) NOT NULL,
  `lecturer_name` varchar(50) NOT NULL,
  `subject_id` int(20) NOT NULL,
  `subject_name` varchar(150) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `room` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `lecturer_id`, `lecturer_name`, `subject_id`, `subject_name`, `start_time`, `end_time`, `room`, `description`) VALUES
(1, 0, 'Isidor Androletti', 0, 'Fire Sprinkler System', '2022-12-23 00:37:18', '2021-11-03 00:00:00', 'Infiniti', 'Traumatic rupture of palmar ligament of right little finger at metacarpophalangeal and interphalangeal joint, sequela'),
(2, 0, 'Dela Mallabar', 0, 'Masonry', '2022-06-08 00:00:00', '2022-06-20 00:00:00', 'Mitsubishi', 'Influenza due to other identified influenza virus with other manifestations'),
(3, 0, 'Micheal Dubbin', 0, 'Temp Fencing, Decorative Fencing and Gates', '2022-07-16 00:00:00', '2022-04-10 00:00:00', 'Ferrari', 'Acne varioliformis'),
(4, 0, 'Casi Packer', 0, 'Fire Sprinkler System', '2022-09-14 00:00:00', '2022-07-14 00:00:00', 'Chrysler', 'Nondisplaced fracture of distal phalanx of unspecified great toe, subsequent encounter for fracture with nonunion'),
(5, 0, 'Evelyn Claxson', 0, 'Marlite Panels (FED)', '2021-10-26 00:00:00', '2021-12-14 00:00:00', 'Ford', 'Adverse effect of other primarily systemic and hematological agents'),
(6, 0, 'Welch Sugars', 0, 'Drywall & Acoustical (FED)', '2022-01-13 00:00:00', '2022-06-09 00:00:00', 'Porsche', 'Unspecified perichondritis of external ear'),
(7, 0, 'Sam Haldane', 0, 'Marlite Panels (FED)', '2021-11-09 00:00:00', '2022-08-16 00:00:00', 'Volkswagen', 'Poisoning by, adverse effect of and underdosing of amphetamines'),
(8, 0, 'Minette Waleworke', 0, 'Structural & Misc Steel Erection', '2022-01-11 00:00:00', '2021-10-03 00:00:00', 'Chevrolet', 'Other specified type of carcinoma in situ of right breast'),
(9, 0, 'Lind Pauwel', 0, 'Hard Tile & Stone', '2021-12-10 00:00:00', '2022-02-12 00:00:00', 'GMC', 'Pathological fracture, left radius, subsequent encounter for fracture with delayed healing'),
(10, 0, 'Marcille Goseling', 0, 'Fire Protection', '2022-03-22 00:00:00', '2022-08-28 00:00:00', 'Toyota', 'Burn with resulting rupture and destruction of unspecified eyeball, sequela'),
(11, 1, 'fgsdfsdg', 32, 'rgyhsdhshsdh', '2022-12-23 10:12:12', '2022-12-23 12:12:12', 'A', 'Memahami konsep dasar kehidupan'),
(12, 1, 'fgsdfsdg', 32, 'rgyhsdhshsdh', '2022-12-23 10:12:12', '2022-12-23 12:12:12', 'A', 'Memahami konsep dasar kehidupan'),
(13, 1, 'fgsdfsdg', 32, 'rgyhsdhshsdh', '2022-12-24 10:12:12', '2022-12-23 12:12:12', 'A', 'Memahami konsep dasar kehidupan'),
(14, 1, 'fgsdfsdg', 32, 'rgyhsdhshsdh', '2022-12-24 10:12:12', '2022-12-23 12:12:12', 'A', 'Memahami konsep dasar kehidupan'),
(15, 1, 'fgsdfsdg', 32, 'rgyhsdhshsdh', '2022-12-25 10:12:12', '2022-12-23 12:12:12', 'A', 'Memahami konsep dasar kehidupan');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `participants`
--
ALTER TABLE `participants`
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
-- AUTO_INCREMENT untuk tabel `participants`
--
ALTER TABLE `participants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
