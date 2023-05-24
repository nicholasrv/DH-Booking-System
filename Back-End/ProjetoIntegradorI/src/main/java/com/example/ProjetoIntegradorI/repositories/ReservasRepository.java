package com.example.ProjetoIntegradorI.repositories;

import com.example.ProjetoIntegradorI.models.ProdutosModel;
import com.example.ProjetoIntegradorI.models.ReservasModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservasRepository extends JpaRepository<ReservasModel, Long> {

    @Query("SELECT p FROM ProdutosModel p WHERE p.id NOT IN(SELECT r.produtos.id FROM ReservasModel r " +
            "WHERE (:dataInicio >= r.dataCheckIn AND :dataInicio <= r.dataCheckOut)" +
            "OR (:dataFinal >= r.dataCheckIn AND :dataFinal <= r.dataCheckOut)" +
            "OR (r.dataCheckIn > :dataInicio AND r.dataCheckOut < :dataFinal))")
    List<ProdutosModel> buscarReservaPorData(LocalDate dataInicio, LocalDate dataFinal);

    @Query("SELECT p FROM ProdutosModel p "+
            "WHERE p.cidades.nomeCidade like :cidade " +
            "AND p.id NOT IN (SELECT r.produtos.id FROM ReservasModel r " +
            "WHERE (:dataInicio >= r.dataCheckIn AND :dataInicio <= r.dataCheckOut)" +
            "OR (:dataFinal >= r.dataCheckIn AND :dataFinal <= r.dataCheckOut)" +
            "OR (r.dataCheckIn > :dataInicio AND r.dataCheckOut < :dataFinal))")
    List<ProdutosModel> buscarReservaPorDataCidade(String cidade, LocalDate dataInicio, LocalDate dataFinal);
}
