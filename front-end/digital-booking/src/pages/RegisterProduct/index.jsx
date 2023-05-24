import { useEffect, useState, useRef } from 'react';
import style from './style.module.css';
import api from '../../service/api';
import axios from 'axios';
import { ErrorForm } from '../../components/ErrorForm';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export function ResgisterProduct() {

    const navigate = useNavigate();

    const [loadingButton, setLoadingButton] = useState(false);

    // Busca de cidades na API
    const [cidades, setCidades] = useState([]);
    const [selectCidades, setSelectCidades] = useState();
    async function getCidades() {
        try {
            const response = await api.get('cidades')
            setCidades(response.data)
        } catch (error) {
            console.log('Erro ao buscar cidades' + error)
        }
    }

    // Busca de categorias na API
    const [categorias, setCategorias] = useState([]);
    const [selectCategoria, setSelectCategorias] = useState();
    async function getCategorias() {
        try {
            const response = await api.get('categoria')
            setCategorias(response.data)
        } catch (error) {
            console.log('Erro ao buscar categorias' + error)
        }

    }

    // Busca de caracteristicas na API
    const [caracteristicas, setCaracteristicas] = useState([]);
    async function getCaracteristicas() {
        try {
            const response = await api.get('caracteristicas')
            setCaracteristicas(response.data)
        } catch (error) {
            console.log('Erro ao buscar caracteristicas' + error)
        }

    }

    useEffect(() => {
        getCidades();
        getCategorias();
        getCaracteristicas()
    }, []);

    const [dataForm, setDataForm] = useState(
        {
            nomeProduto: '', categoria: {}, endereco: '', cidades: {}, descricaoProduto: '', nomeAtributoValue: '', nomeAtributo: [], iconeAtributo: [],
            politicaSaudeSeguranca: '', politicaCancelamento: '', politicaRegrasCasa: '', imagens: [], imagemValue: ""
        }
    );

    const [id, setId] = useState(0);
    const incrementarId = () => {
        setId(prev => prev + 1);
    }

    // Metodo que adiciona uma imagem de cada vez
    const addImage = (e) => {
        e.preventDefault();
        incrementarId();

        setDataForm({ ...dataForm, imagemValue:"" ,imagens: [...dataForm.imagens, { id: id, url: dataForm.imagemValue }] });
    }

    // Metodo que adiciona o nome do atributo e o icone
    const addIcone = (e) => {
        e.preventDefault();

        setDataForm({ ...dataForm, iconeAtributo: [...dataForm.iconeAtributo, dataForm.iconeValue], nomeAtributo: [...dataForm.nomeAtributo, dataForm.nomeAtributoValue] });
    }

    //Armazena as imagens cadastradas no banco
    const [imagensCadastradas, setImagensCadastradas] = useState([]);

    //Metodo para inserir imagens na api
    function postImagens() {
        const imagem = [];
        try {
            const arrayImagens = dataForm.imagens.map(element => {
                api.post('imagens/salvar', {
                    "tituloImagem": dataForm.nomeProduto,
                    "urlImagem": element.url
                }).then(data => {
                    return imagem.push(data.data)
                })
            })

            return imagem;
        } catch (error) {
            console.log('Erro ao cadastrar imagem' + error)
            return error
        }
    }

    function registrarProduto() {
        //Traz imagens cadastradas no banco de dados
        const imagens = postImagens();

        //Acionando spinner de espera
        setLoadingButton(prev => !prev);

        let timer = setTimeout(async function () {
            //Se nenhuma imagem for cadastrada não deve chamar a função
            const response = imagens.length != 0 ? await postProduto(imagens): '';
            //Desabilitar spinner
            setLoadingButton(prev => !prev);
            response.status == 200 ? navigate("/produto-cadastrado") : navigate("/erro-a-cadastrar");
        }, 5000)

        // let timer2 = setTimeout(function()
        // {
        // }, 6000);
    }

    //Metodo que registra um produto na api
    async function postProduto(imagens) {
        try {
            const response = api.post('produtos/salvar', {
                "produtosCaracteristica": dataForm.iconeAtributo,
                "imagens": imagens,
                "categoria": dataForm.categoria,
                "nomeProduto": dataForm.nomeProduto,
                "descricaoProduto": dataForm.descricaoProduto,
                "regrasDaCasa": dataForm.politicaRegrasCasa,
                "saudeSeguranca": dataForm.politicaSaudeSeguranca,
                "politicaDeCancelamento": dataForm.politicaCancelamento,
                "endereco": dataForm.endereco,
                "cidades": dataForm.cidades
            })
            return response
        } catch (error) {
            console.log('Erro ao cadastrar produto' + error)
        }
    }

    const [error, setError] = useState({
        nomeError: false, categoriaError: false, enderecoError: false, cidadeError: false, descricaoError: false,
        errorAtributo: false, errorImagem: false, errorPoliticaCasa: false, errorPoliticaSaudeSeguranca: false, errorPoliticaCancelamento: false
    });

    //Metodo de manipulação de envio de dados api
    const handlerSubmit = (e) => {
        e.preventDefault();
        //Se passar nas validações registra o produto
        if (!dataForm.nomeProduto.length < 1 && !Object.keys(dataForm.categoria).length < 1 && !dataForm.endereco.length < 1 && !Object.keys(dataForm.cidades).length < 1
            && !dataForm.descricaoProduto.length < 1 && !dataForm.iconeAtributo.length == 0 && !dataForm.imagens.length < 5 && !dataForm.politicaRegrasCasa.length < 1 &&
            !dataForm.politicaSaudeSeguranca.length < 1 && !dataForm.politicaCancelamento.length < 1) {
            registrarProduto();
        }
        else {
            setError({
                nomeError: dataForm.nomeProduto.length < 1 ? true : false,
                categoriaError: Object.keys(dataForm.categoria).length < 1 ? true : false,
                enderecoError: dataForm.endereco.length < 1 ? true : false,
                cidadeError: Object.keys(dataForm.cidades).length < 1 ? true : false,
                descricaoError: dataForm.descricaoProduto.length < 1 ? true : false,
                errorAtributo: dataForm.iconeAtributo.length == 0 ? true : false,
                errorImagem: dataForm.imagens.length < 5 ? true : false,
                errorPoliticaCasa: dataForm.politicaRegrasCasa.length < 1 ? true : false,
                errorPoliticaSaudeSeguranca: dataForm.politicaSaudeSeguranca.length < 1 ? true : false,
                errorPoliticaCancelamento: dataForm.politicaCancelamento.length < 1 ? true : false
            });
            console.log('error')
        }
    }

    return (
        <div className={style.container}>
            <h1>Criar produto</h1>
            <div className={style.form}>
                <form action="#">
                    <div className={style.productRegister}>
                        <div>
                            <label htmlFor="">Nome do produto:</label>
                            <input value={dataForm.nomeProduto} maxLength={254} onChange={(e) => setDataForm({ ...dataForm, nomeProduto: e.target.value })} type="text" required />
                            {error.nomeError ? <ErrorForm text="O campo não pode ser vazio" /> : ''}
                        </div>

                        <div>
                            <label htmlFor="">Categoria:</label>
                            <select name="" id="" defaultValue={'DEFAULT'} onChange={(e) => setDataForm({ ...dataForm, categoria: { "id": parseInt(e.target.value) } })} required>
                                <option value="DEFAULT" disabled>Selecione uma categoria</option>
                                {categorias.map(element => {
                                    return (
                                        <option key={element.id} value={element.id}>{element.descricaoCategoria}</option>
                                    )
                                })}
                            </select>
                            {error.categoriaError ? <ErrorForm text="Selecione uma categoria" /> : ''}
                        </div>

                        <div>
                            <label htmlFor="">Endereço:</label>
                            <input maxLength={254} type="text" value={dataForm.endereco} onChange={(e) => setDataForm({ ...dataForm, endereco: e.target.value })} />
                            {error.enderecoError ? <ErrorForm text="Por favor digite um endereço" /> : ''}
                        </div>

                        <div>
                            <label htmlFor="">Cidade:</label>
                            <select name="" id="" defaultValue={'DEFAULT'} onChange={(e) => setDataForm({ ...dataForm, cidades: { "id": parseInt(e.target.value) } })} required>
                                <option value="DEFAULT" disabled>Selecione uma cidade</option>
                                {cidades.map(element => {
                                    return (
                                        <option key={element.id} value={element.id}>{element.nomeCidade}</option>
                                    )
                                })}
                            </select>
                            {error.cidadeError ? <ErrorForm text="Selecione uma cidade" /> : ''}
                        </div>

                        <div className={style.area}>
                            <label htmlFor="">Descrição:</label>
                            <textarea maxLength={254} name="" id="" cols="30" rows="10" required placeholder='Escreva a descrição do produto' value={dataForm.descricaoProduto} onChange={(e) => setDataForm({ ...dataForm, descricaoProduto: e.target.value })}></textarea>
                            {error.descricaoError ? <ErrorForm text="Seu produto deve ter uma descrição" /> : ''}

                        </div>
                    </div>

                    <div className={style.productRegister}>
                        <div id={style.imagens}>
                            <h1>Adicionar atributos</h1>
                            {/* <input type="text" value={dataForm.nomeAtributoValue} onChange={e => setDataForm({ ...dataForm, nomeAtributoValue: e.target.value })} /> */}
                            <select name="" id="" defaultValue={"DEFAULT"} onChange={e => setDataForm({ ...dataForm, iconeAtributo: [...dataForm.iconeAtributo, { id: e.target.value }] })}>
                                <option value="DEFAULT" disabled>Selecione um icone</option>
                                {caracteristicas.map(element => {
                                    return (
                                        <option key={element.id} value={element.id}>{element.nomeCaracteristica}</option>
                                    );
                                })}
                            </select>
                            {dataForm.iconeAtributo.length != 0 ?
                                <div className={style.imagensInseridas}>
                                    {dataForm.iconeAtributo.map(
                                        (element, idx) => <section className={style.excluirDiv}>
                                            <p>Icone {idx + 1}</p>
                                            <span onClick={() => {
                                                setDataForm({ ...dataForm, iconeAtributo: [...dataForm.iconeAtributo.filter((current) => current.id != element.id)] })
                                            }}></span>
                                        </section>
                                    )}
                                </div>
                                : ""}
                            {error.errorAtributo ? <ErrorForm text="Selecione ao menos um atributo" /> : ''}
                        </div>
                        <div id={style.imagens}>
                            <h1>Carregar Imagens</h1>
                            <div>
                                <input maxLength={998} type="text" placeholder='Insira https://' value={dataForm.imagemValue} onChange={e => setDataForm({ ...dataForm, imagemValue: e.target.value })} />
                                <button className={style.buttonAdd} onClick={addImage}>+</button>
                            </div>
                            {dataForm.imagens.length != 0 ?
                                <div className={style.imagensInseridas}>
                                    {dataForm.imagens.map(
                                        (element, idx) => <section className={style.excluirDiv}>
                                            <p>Imagem {idx + 1}</p>
                                            <span onClick={() => {
                                                setDataForm({ ...dataForm, imagens: [...dataForm.imagens.filter((current) => current.id != element.id)] })
                                            }}></span>
                                        </section>
                                    )}
                                </div>
                                : ""}
                            {error.errorImagem ? <ErrorForm text="Selecione ao menos cinco imagens" /> : ''}
                        </div>
                    </div>

                    <div id={style.politicas} className={style.productRegister}>
                        <h1>Políticas do produto</h1>
                        <div>
                            <h2>Regras da casa</h2>
                            <label htmlFor="">Descrição:</label>
                            <textarea name="" id="" cols="30" rows="10" placeholder='Digite uma descrição' value={dataForm.politicaRegrasCasa} onChange={(e) => setDataForm({ ...dataForm, politicaRegrasCasa: e.target.value })} maxLength={254}></textarea>
                            {error.errorPoliticaCasa ? <ErrorForm text="O campo não pode ser vazio" /> : ''}
                        </div>

                        <div>
                            <h2>Saúde e segurança</h2>
                            <label htmlFor="">Descrição:</label>
                            <textarea maxLength={254} name="" id="" cols="30" rows="10" placeholder='Digite uma descrição' value={dataForm.politicaSaudeSeguranca} onChange={(e) => setDataForm({ ...dataForm, politicaSaudeSeguranca: e.target.value })}></textarea>
                            {error.errorPoliticaSaudeSeguranca ? <ErrorForm text="O campo não pode ser vazio" /> : ''}
                        </div>

                        <div>
                            <h2>Política de cancelamento</h2>
                            <label htmlFor="">Descrição:</label>
                            <textarea maxLength={254} name="" id="" cols="30" rows="10" placeholder='Digite uma descrição' value={dataForm.politicaCancelamento} onChange={(e) => setDataForm({ ...dataForm, politicaCancelamento: e.target.value })}></textarea>
                            {error.errorPoliticaCancelamento ? <ErrorForm text="O campo não pode ser vazio" /> : ''}
                        </div>
                    </div>
                    {loadingButton ? <>
                        <img className={style.spinner} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="spinner" />
                        <button onClick={handlerSubmit} className={style.buttonCriarLoading} type='submit' disabled>
                            Carregando</button></> :
                        <button onClick={handlerSubmit} className={style.buttonCriar} type='submit'>Criar</button>}
                </form>
            </div>
        </div>
    )
}