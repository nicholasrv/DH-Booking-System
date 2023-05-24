package com.example.ProjetoIntegradorI.controllers;

import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.DeserializadorDataModel;
import com.example.ProjetoIntegradorI.models.ProdutosModel;
import com.example.ProjetoIntegradorI.models.ReservasModel;
import com.example.ProjetoIntegradorI.repositories.ReservasRepository;
import com.example.ProjetoIntegradorI.services.impl.ReservasServiceImpl;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class ReservasController {

    private final ReservasServiceImpl reservasService;

    @Autowired
    public ReservasController(ReservasServiceImpl reservasService) {
        this.reservasService = reservasService;
    }

    /// POST
    @PostMapping("/reservas/salvar")
    public ResponseEntity<ReservasModel> salvar(@RequestBody @JsonDeserialize(using = DeserializadorDataModel.Deserializer.class) ReservasModel reservasModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(reservasService.salvar(reservasModel));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    // GET BY ID
    @GetMapping("/reservas/{id}")
    public ResponseEntity<Optional<ReservasModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            Optional<ReservasModel> reservasModel = reservasService.buscarPorId(id);
            if (reservasModel != null && reservasModel.isPresent()) {
                return ResponseEntity.ok(reservasModel);
            }
            throw new ResourceNotFoundException("Não foi encontrada a reserva " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar a reserva " + id);
        }
    }

    // BUSCAR RESERVA POR DATA
    @GetMapping("/reservas/buscarReservaPorData")
    public ResponseEntity<List<ProdutosModel>> buscarReservaPorData(@RequestParam @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataInicio, @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataFinal) throws ResourceNotFoundException{
        try{
            List<ProdutosModel> list = reservasService.buscarReservaPorData(dataInicio, dataFinal);
            if(list.size() == 0) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            throw new ResourceNotFoundException("Não foi possível localizar a reserva solicitada.");
        }
    }

    // BUSCAR RESERVA POR DATA E CIDADE
    @GetMapping("/reservas/buscarReservaPorDataCidade")
    public ResponseEntity<List<ProdutosModel>> buscarReservaPorDataCidade(@RequestParam String cidade, @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataInicio, @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataFinal) throws ResourceNotFoundException{
        try{
            List<ProdutosModel> list = reservasService.buscarReservaPorDataCidade(cidade, dataInicio, dataFinal);
            if(list.size() == 0) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            throw new ResourceNotFoundException("Não foi possível localizar a reserva solicitada.");
        }
    }

}
