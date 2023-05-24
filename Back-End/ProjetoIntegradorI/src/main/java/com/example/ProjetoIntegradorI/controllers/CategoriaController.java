package com.example.ProjetoIntegradorI.controllers;

import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.models.UsuarioModel;
import com.example.ProjetoIntegradorI.services.IBookingService;
import com.example.ProjetoIntegradorI.services.impl.CategoriaServiceImpl;
import com.example.ProjetoIntegradorI.services.impl.UsuarioServiceImpl;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class CategoriaController {

    private CategoriaServiceImpl categoriaService;

    public CategoriaController(CategoriaServiceImpl categoriaService) {this.categoriaService = categoriaService; }

    /// POST
    @PostMapping("/categoria/salvar")
    public ResponseEntity<CategoriaModel> salvarCategoria(@RequestBody CategoriaModel categoriaModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(categoriaService.salvar(categoriaModel));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // PUT OU UPDATE
    @PutMapping("/categoria/alterar")
    public ResponseEntity alterarCategoria(@RequestBody CategoriaModel categoriaModel) throws SQLException {
        return ResponseEntity.ok(categoriaService.alterar(categoriaModel));
    }

    // GET
    @RequestMapping(value = "/categoria", method = RequestMethod.GET, produces = "application/json")
    public List<CategoriaModel> buscarTodos() throws SQLException {
        return categoriaService.buscarTodos();
    }

    // GET BY ID
    @GetMapping("/categoria/{id}")
    public ResponseEntity<Optional<CategoriaModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try{
            Optional<CategoriaModel> categoriaModel = categoriaService.buscarPorId(id);
            if(categoriaModel != null && categoriaModel.isPresent()){
                return ResponseEntity.ok(categoriaModel);
            }
            throw new ResourceNotFoundException("Não foi encontrada a categoria " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar a categoria " + id);
        }
    }

    //DELETE
    @DeleteMapping("/categoria/delete/{id}")
    public ResponseEntity excluirCategoria(@PathVariable Long id) throws ResourceNotFoundException, SQLException {
        boolean excluiu = categoriaService.excluir(id);
        if(excluiu) {
            return ResponseEntity.ok("categoria deletada com sucesso!");
        }
        throw new ResourceNotFoundException("Não foi encontrada a categoria com o id " + id);
    }

}
