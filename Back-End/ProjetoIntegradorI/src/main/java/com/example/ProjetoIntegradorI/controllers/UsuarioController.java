package com.example.ProjetoIntegradorI.controllers;

import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.UsuarioModel;
import com.example.ProjetoIntegradorI.services.IBookingService;
import com.example.ProjetoIntegradorI.services.impl.UsuarioServiceImpl;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioController {
    private UsuarioServiceImpl usuarioService;

    public UsuarioController(UsuarioServiceImpl usuarioService) {this.usuarioService = usuarioService; }

    /// POST
    @PostMapping("/usuario/salvar")
    public ResponseEntity<UsuarioModel> salvarUsuario(@RequestBody UsuarioModel usuarioModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(usuarioService.salvar(usuarioModel));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // PUT OU UPDATE
    @PutMapping("/usuario/alterar")
    public ResponseEntity alterarUsuario(@RequestBody UsuarioModel usuarioModel) throws SQLException {
        return ResponseEntity.ok(usuarioService.alterar(usuarioModel));
    }

    // GET
    @RequestMapping(value = "/usuario", method = RequestMethod.GET, produces = "application/json")
    public List<UsuarioModel> buscarTodos() throws SQLException {
        return usuarioService.buscarTodos();
    }

    // GET BY ID
    @GetMapping("/usuario/{id}")
    public ResponseEntity<Optional<UsuarioModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try{
            Optional<UsuarioModel> usuarioModel = usuarioService.buscarPorId(id);
            if(usuarioModel != null && usuarioModel.isPresent()){
                return ResponseEntity.ok(usuarioModel);
            }
            throw new ResourceNotFoundException("Não foi encontrado o usuario " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar o usuario " + id);
        }
    }

    //DELETE
    @DeleteMapping("/usuario/delete/{id}")
    public ResponseEntity excluirUsuario(@PathVariable Long id) throws ResourceNotFoundException, SQLException {
        boolean excluiu = usuarioService.excluir(id);
        if(excluiu) {
            return ResponseEntity.ok("usuário deletado com sucesso!");
        }
        throw new ResourceNotFoundException("Não foi encontrado o usuário com o id " + id);
    }
}


