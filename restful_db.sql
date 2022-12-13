-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: dbSchedule
-- Waktu pembuatan: 29 Okt 2022 pada 00.49
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
  `full_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Ketidakleluasaan untuk tabel `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);
COMMIT;
