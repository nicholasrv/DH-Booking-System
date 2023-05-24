package com.example.ProjetoIntegradorI.controllers;

import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.models.CidadesModel;
import com.example.ProjetoIntegradorI.models.UsuarioModel;
import com.example.ProjetoIntegradorI.services.IBookingService;
import com.example.ProjetoIntegradorI.services.impl.CategoriaServiceImpl;
import com.example.ProjetoIntegradorI.services.impl.CidadesServiceImpl;
import com.example.ProjetoIntegradorI.services.impl.UsuarioServiceImpl;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class CidadesController {

    private CidadesServiceImpl cidadesService;

    public CidadesController(CidadesServiceImpl cidadesService) {
        this.cidadesService = cidadesService;
    }

    /// POST
    @PostMapping("/cidades/salvar")
    public ResponseEntity<CidadesModel> salvarCidade(@RequestBody CidadesModel cidadesModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(cidadesService.salvar(cidadesModel));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // PUT OU UPDATE
    @PutMapping("/cidades/alterar")
    public ResponseEntity alterarCategoria(@RequestBody CidadesModel cidadesModel) throws SQLException {
        return ResponseEntity.ok(cidadesService.alterar(cidadesModel));
    }

    // GET
    @RequestMapping(value = "/cidades", method = RequestMethod.GET, produces = "application/json")
    public List<CidadesModel> buscarTodos() throws SQLException {
        return cidadesService.buscarTodos();
    }

    // GET BY ID
    @GetMapping("/cidades/{id}")
    public ResponseEntity<Optional<CidadesModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            Optional<CidadesModel> cidadesModel = cidadesService.buscarPorId(id);
            if (cidadesModel != null && cidadesModel.isPresent()) {
                return ResponseEntity.ok(cidadesModel);
            }
            throw new ResourceNotFoundException("Não foi encontrada a cidade " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar a cidade " + id);
        }
    }

    //DELETE
    @DeleteMapping("/cidades/delete/{id}")
    public ResponseEntity excluirCidade(@PathVariable Long id) throws ResourceNotFoundException, SQLException {
        boolean excluiu = cidadesService.excluir(id);
        if (excluiu) {
            return ResponseEntity.ok("cidade deletada com sucesso!");
        }
        throw new ResourceNotFoundException("Não foi encontrada a cidade com o id " + id);
    }
}

