package com.example.ProjetoIntegradorI.controllers;


import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.*;
import com.example.ProjetoIntegradorI.services.impl.ProdutosServiceImpl;
import com.example.ProjetoIntegradorI.services.impl.ReservasServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ProdutosController {

    private ProdutosServiceImpl produtosService;
    private ReservasServiceImpl reservasService;

    @Autowired
    public ProdutosController(ProdutosServiceImpl produtosService, ReservasServiceImpl reservasService) {
        this.produtosService = produtosService;
        this.reservasService = reservasService;
    }

    /// POST
    @PostMapping("/produtos/salvar")
    public ResponseEntity<ProdutosModel> salvarProduto(@RequestBody ProdutosModel produtosModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(produtosService.salvar(produtosModel));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    // PUT OU UPDATE
    @PutMapping("/produtos/alterar")
    public ResponseEntity alterarProduto(@RequestBody ProdutosModel produtosModel) throws SQLException {
        return ResponseEntity.ok(produtosService.alterar(produtosModel));
    }

    // GET
    @RequestMapping(value = "/produtos", method = RequestMethod.GET, produces = "application/json")
    public List<ProdutosModel> buscarTodos() throws SQLException {
        return produtosService.buscarTodos();
    }


    // GET PRODUTOS BY CATEGORIA
    @GetMapping("/produtoscategoria/{id}")
    public ResponseEntity<List<ProdutosModel>> findByCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(produtosService.findByCategoria(id));
    }

    // GET PRODUTOS BY CIDADES
    @GetMapping("/produtoscidades/{id}")
    public List<ProdutosModel> findByCidades(@PathVariable Long id) throws ResourceNotFoundException {
        return produtosService.findByCidades(id);
    }

    // GET BY ID
    @GetMapping("/produtos/{id}")
    public ResponseEntity<Optional<ProdutosModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            Optional<ProdutosModel> produtosModel = produtosService.buscarPorId(id);
            if (produtosModel != null && produtosModel.isPresent()) {
                return ResponseEntity.ok(produtosModel);
            }
            throw new ResourceNotFoundException("Não foi encontrado o produto " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar o produto " + id);
        }
    }

    //DELETE
    @DeleteMapping("/produtos/delete/{id}")
    public ResponseEntity excluirProduto(@PathVariable Long id) throws ResourceNotFoundException, SQLException {
        boolean excluiu = produtosService.excluir(id);
        if (excluiu) {
            return ResponseEntity.ok("produto deletado com sucesso!");
        }
        throw new ResourceNotFoundException("Não foi encontrada o produto com o id " + id);
    }
}
