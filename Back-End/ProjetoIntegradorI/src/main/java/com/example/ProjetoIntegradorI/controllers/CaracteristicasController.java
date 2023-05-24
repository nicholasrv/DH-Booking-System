package com.example.ProjetoIntegradorI.controllers;

import com.example.ProjetoIntegradorI.exceptions.BadRequestException;
import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.CaracteristicasModel;
import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.services.impl.CaracteristicasServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class CaracteristicasController {

    public final CaracteristicasServiceImpl caracteristicasService;

    public CaracteristicasController(CaracteristicasServiceImpl caracteristicasService) {
        this.caracteristicasService = caracteristicasService;
    }

    /// POST
    @PostMapping("/caracteristicas/salvar")
    public ResponseEntity<CaracteristicasModel> salvarCaracteristica(@RequestBody CaracteristicasModel caracteristicasModel) throws BadRequestException {
        try {
            return ResponseEntity.ok(caracteristicasService.salvar(caracteristicasModel));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // PUT OU UPDATE
    @PutMapping("/caracteristicas/alterar")
    public ResponseEntity alterarCaracteristica(@RequestBody CaracteristicasModel caracteristicasModel) throws SQLException {
        return ResponseEntity.ok(caracteristicasService.alterar(caracteristicasModel));
    }

    // GET
    @RequestMapping(value = "/caracteristicas", method = RequestMethod.GET, produces = "application/json")
    public List<CaracteristicasModel> buscarTodos() throws SQLException {
        return caracteristicasService.buscarTodos();
    }

    // GET BY ID
    @GetMapping("/caracteristicas/{id}")
    public ResponseEntity<Optional<CaracteristicasModel>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException {
        try{
            Optional<CaracteristicasModel> caracteristicasModel = caracteristicasService.buscarPorId(id);
            if(caracteristicasModel != null && caracteristicasModel.isPresent()){
                return ResponseEntity.ok(caracteristicasModel);
            }
            throw new ResourceNotFoundException("Não foi encontrada a caracteristica " + id);
        } catch (SQLException e) {
            throw new ResourceNotFoundException("Erro ao buscar a caracteristica " + id);
        }
    }

    //DELETE
    @DeleteMapping("/caracteristicas/delete/{id}")
    public ResponseEntity excluirCaracteristica(@PathVariable Long id) throws ResourceNotFoundException, SQLException {
        boolean excluiu = caracteristicasService.excluir(id);
        if(excluiu) {
            return ResponseEntity.ok("caracteristica deletada com sucesso!");
        }
        throw new ResourceNotFoundException("Não foi encontrada a caracteristica com o id " + id);
    }


}
