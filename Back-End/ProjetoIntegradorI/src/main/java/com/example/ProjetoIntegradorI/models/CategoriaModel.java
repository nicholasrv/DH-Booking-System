package com.example.ProjetoIntegradorI.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "Categoria")

public class CategoriaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String qualificacaoCategoria;
    private String descricaoCategoria;
    private String urlImagemCategoria;

    public CategoriaModel(String qualificacaoCategoria, String descricaoCategoria, String urlImagemCategoria) {
        this.qualificacaoCategoria = qualificacaoCategoria;
        this.descricaoCategoria = descricaoCategoria;
        this.urlImagemCategoria = urlImagemCategoria;
    }
}
