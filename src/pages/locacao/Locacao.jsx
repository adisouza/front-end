import React,{Component} from 'react'
import Main from '../../components/templates/Main'
import axios from 'axios'

const baseUrl = 'https://localhost:44378/api/'

const headerProps={
icon: 'bookeds',
title: 'Locações',
subtitle: 'Cadastrar, deletar, atualizar e consultar Locações'

}
let listCliente=[]
let listFilme=[]
const initialState = {
    locacao:{
        idFilme:{},
        idCliente:{},
        dataLocacao:'',
        dataDevolucao:''
    },
list:[],
listCliente,
listFilme
}

export default class Locacao extends Component{
    //refresh components ctates 
    state ={ 
        ...initialState
    }

    load(locacao){
        this.setState({locacao})
    }

    clear(){
        this.setState({locacao: initialState.locacao})
    }

    getUpdatedList(locacao){
        const list = this.state.list.filter(c => c.id !== locacao.id);
        if(locacao){
            list.push(locacao)
        }
        return list
    }

//httpRequest/Response    
    componentWillMount(){
        // axios(`${baseUrl}LocacaoGetAll`)
        // .then(resp =>{
        //     this.setState({list: resp.data})
        // })
        axios(`${baseUrl}cliente/GetAll`)
        .then(resp =>{
            console.log(resp.data)
            listCliente = resp.data
            this.setState({listCliente})
        })
        axios.get(`https://localhost:44378/FilmeGetAll`)
        .then(resp =>{
            listFilme = resp.data;
            this.setState({listFilme});
        })
    }

    save(){
        const locacao = this.state.locacao
        const method = locacao.id ? 'put' : 'post'
        const url = locacao.id ? `${baseUrl}${locacao.id}`:`${baseUrl}Insert/`
        axios[method](url,locacao)
        .then(resp =>{
            const list = this.getUpdatedList(resp.data)
            this.setState({list})
        })
    }

    remove(locacao){
        axios.delete(`${baseUrl}${locacao.locacao.id}`)
        .then(resp => {
            const list = this.state.list.filter(c => c.id === locacao.id);
            this.setState({list})
        })
    }
    
    //Elements/Events
    updateField(event){
        console.log('cheguei evento')
        const locacao = {...this.state.locacao}
        locacao[event.target.name] = event.target.value
        this.setState({locacao})
    }

    renderForm(){
return(
    <div className="form">  
        
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Nome do cliente</label>
                    <br/>
                    <select>
               {listCliente.map(listCliente => {
                return(
                <option value = {listCliente.id}>{listCliente.nome}</option>
                )
               })}
               </select>
                </div>
            </div>
            <div className="col-12 col-md-6">
            <label>Titulo do Filme</label>
            <br/>
               <select>
               {listFilme.map(listFilme => {
                return(
                <option value = {listFilme.id}>{listFilme.titulo}</option>
                )
               })}
               </select>
                
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Data de locacao</label>
                    <input 
                    type="date" 
                    className="form-control" 
                    name="dataLocacao" 
                    value={this.state.locacao.dataLocacao} 
                    onChange={e => this.updateField(e)} />
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Data de devolucao</label>
                    <input 
                    type="date" 
                    className="form-control" 
                    name="dataDevolucao" 
                    value={this.state.locacao.dataDevolucao} 
                    onChange={e => this.updateField(e)} />
                </div>
            </div>
        </div>

        <div className="row">   
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-primary ml-2" onClick={e => this.save(e)}>
                    Salvar
                </button>
                <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}> 
                Cancelar
                </button>
            </div>
        </div>

    </div>
)
    }

    renderTable(){
        return(
            <table className="table ml-4">
            <thead>
            <tr>
              <th>Id</th>
              <th>Nome cliente</th>
              <th>titulo do filme</th>
              <th>data de locacao</th>
              <th>data de devolucao</th>
            </tr>
          </thead>
          <tbody>
  {this.renderRows()}
          </tbody>
        </table>
        )
    }
    renderRows(){
        return this.state.list.map(locacao =>{
            return(
                <tr key={locacao.id}>
                <td>{locacao.id}</td>
                <td>{locacao.idCliente.nome}</td>
                <td>{locacao.idFilme.titulo}</td>
                <td>{locacao.dataLocacao}</td>
                <td>{locacao.dataDevolucao}</td>
                  <button className='btn btn-warning' onClick={e => this.load({locacao})}>
                    <i className='fa fa-pencil'></i>
                  </button>
                  <button className='btn btn-danger ml-2'  onClick={e=> this.remove({locacao})}>
                  <i className='fa fa-trash'></i>
                  </button>
                </tr>
            )
        })
    }

    render(){
        return(
<Main {...headerProps}>
    {this.renderForm()}
    {this.renderTable()}
</Main>
        )
    }
}