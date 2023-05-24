package com.example.ProjetoIntegradorI.controllers;

import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.ImagensModel;
import com.example.ProjetoIntegradorI.models.ProdutosModel;
import com.example.ProjetoIntegradorI.services.impl.ImagensServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ImagensController {
    private final ImagensServiceImpl imagensService;

    @Autowired
    public ImagensController(ImagensServiceImpl imagensService) {
        this.imagensService = imagensService;
    }

    /// POST
    @PostMapping("/imagens/salvar")
    public ResponseEntity<ImagensModel> salvarImagem(@RequestBody ImagensModel imagensModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(imagensService.salvar(imagensModel));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    // PUT OU UPDATE
    @PutMapping("/imagens/alterar")
    public ResponseEntity alterarImagem(@RequestBody ImagensModel imagensModel) throws SQLException {
        return ResponseEntity.ok(imagensService.alterar(imagensModel));
    }

    // GET
    @RequestMapping(value = "/imagens", method = RequestMethod.GET, produces = "application/json")
    public List<ImagensModel> buscarTodos() throws SQLException {
        return imagensService.buscarTodos();
    }


    // GET BY ID
    @GetMapping("/imagens/{id}")
    public ResponseEntity<Optional<ImagensModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            Optional<ImagensModel> imagensModel = imagensService.buscarPorId(id);
            if (imagensModel != null && imagensModel.isPresent()) {
                return ResponseEntity.ok(imagensModel);
            }
            throw new ResourceNotFoundException("Não foi encontrada a imagem " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar a imagem " + id);
        }
    }

    //DELETE
    @DeleteMapping("/imagens/delete/{id}")
    public ResponseEntity excluirImagem(@PathVariable Long id) throws ResourceNotFoundException, SQLException {
        boolean excluiu = imagensService.excluir(id);
        if (excluiu) {
            return ResponseEntity.ok("imagem deletada com sucesso!");
        }
        throw new ResourceNotFoundException("Não foi encontrada a imagem com o id " + id);
    }


}
