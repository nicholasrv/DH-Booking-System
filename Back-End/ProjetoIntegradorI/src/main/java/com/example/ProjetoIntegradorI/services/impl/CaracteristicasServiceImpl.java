package com.example.ProjetoIntegradorI.services.impl;

import com.example.ProjetoIntegradorI.models.CaracteristicasModel;
import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.repositories.CaracteristicasRepository;
import com.example.ProjetoIntegradorI.repositories.CategoriaRepository;
import com.example.ProjetoIntegradorI.services.IBookingService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicasServiceImpl implements IBookingService<CaracteristicasModel> {

    private final CaracteristicasRepository caracteristicasRepository;

    public CaracteristicasServiceImpl(CaracteristicasRepository caracteristicasRepository) {
        this.caracteristicasRepository = caracteristicasRepository;
    }

    @Override
    public CaracteristicasModel salvar(CaracteristicasModel caracteristicasModel) {
        if(caracteristicasModel != null){
            return caracteristicasRepository.save(caracteristicasModel);
        }
        return new CaracteristicasModel();
    }

    @Override
    public String alterar(CaracteristicasModel caracteristicasModel) {
        if(caracteristicasModel != null && caracteristicasRepository.findById(caracteristicasModel.getId()).isPresent()){
            caracteristicasRepository.saveAndFlush(caracteristicasModel);
            return "Caracteristicas alteradas com sucesso!";
        }
        return "Não foi possível alterar as caracteristicas.";
    }

    @Override
    public List<CaracteristicasModel> buscarTodos() throws SQLException {
        return caracteristicasRepository.findAll();
    }

    @Override
    public Optional<CaracteristicasModel> buscarPorId(Long id) throws SQLException {
        return caracteristicasRepository.findById(id);
    }

    @Override
    public boolean excluir(Long id) throws SQLException {
        if(caracteristicasRepository.findById(id).isPresent()){
            caracteristicasRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
