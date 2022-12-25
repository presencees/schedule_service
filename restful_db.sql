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
  `course_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `room_id` int(11) NOT NULL,
  `lecture_id` int(11) NOT NULL,
  `lecture_meet` int(2) NOT NULL,
  `presence_duration` int(3) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Struktur dari tabel `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(150) NOT NULL,
  `course_credits` int(2) NOT NULL,
  `semester` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `course_credits`, `semester`) VALUES
(1, "Bahasa Inggris", 3, 1),
(2, "Jaringan Dasar", 3, 2),
(3, "Pemrograman Dasar", 3, 3),
(4, "Jaringan Lanjut", 4, 4),
(5, "Pemrograman Lanjut", 4, 5);

--
-- Struktur dari tabel `room`
--

CREATE TABLE `room` (
  `room_id` int(20) NOT NULL,
  `room_name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `room`
--

INSERT INTO `room` (`room_id`, `room_name`) VALUES
(1, "A"),
(2, "B"),
(3, "C"),
(4, "D"),
(5, "E"),
(6, "F");

--
-- Struktur dari tabel `lecture`
--

CREATE TABLE `lecture` (
  `lecture_id` int(20) NOT NULL,
  `lecture_name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `lecture`
--

INSERT INTO `lecture` (`lecture_id`, `lecture_name`) VALUES
(1, "TI_1"),
(2, "TI_2"),
(3, "TI_3");

--
-- Struktur dari tabel `config`
--

CREATE TABLE `config` (
  `config_id` int(20) NOT NULL,
  `config_name` varchar(150) NOT NULL,
  `config_value` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `config`
--

INSERT INTO `config` (`config_id`, `config_name`, `config_value`) VALUES
(1, "semester", "ganjil"),
(2, "lecture_meet_max", "16"),
(3, "schedule_add_auto_fullscreen", "false"),
(4, "semester_auto_detect", "true");

--
-- Indeks untuk tabel `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`participant_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indeks untuk tabel `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indeks untuk tabel `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indeks untuk tabel `lecture`
--
ALTER TABLE `lecture`
  ADD PRIMARY KEY (`lecture_id`);

--
-- Indeks untuk tabel `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indeks untuk tabel `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`config_id`);

--
-- AUTO_INCREMENT untuk tabel `participants`
--
ALTER TABLE `participants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT untuk tabel `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `lecture`
--
ALTER TABLE `lecture`
  MODIFY `lecture_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `config`
--
ALTER TABLE `config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);
ALTER TABLE schedule
  ADD FOREIGN KEY (course_id) REFERENCES course(course_id);
ALTER TABLE `schedule`
  ADD FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);
ALTER TABLE `schedule`
  ADD FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`lecture_id`);
COMMIT;
