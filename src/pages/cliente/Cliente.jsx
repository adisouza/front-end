import React,{Component} from 'react'
import Main from '../../components/templates/Main'
import axios from 'axios'

const baseUrl = 'https://localhost:44378/api/cliente/'

const headerProps={
icon: 'users',
title: 'Clientes',
subtitle: 'Cadastrar, deletar, atualizar e consultar clientes'

}

const initialState = {
    cliente:{
        nome:'',
        cpf:'',
        dataNascimento:''
    },
list:[]
}

export default class cliente extends Component{
    //refresh components ctates 
    state ={ 
        ...initialState
    }

    load(cliente){
        this.setState({cliente})
    }

    clear(){
        this.setState({cliente: initialState.cliente})
    }

    getUpdatedList(cliente){
        const list = this.state.list.filter(c => c.id !== cliente.id);
        if(cliente){
            list.push(cliente)
        }
        return list
    }

//httpRequest/Response    
    componentWillMount(){
        axios(`${baseUrl}getAll`)
        .then(resp =>{
            this.setState({list: resp.data})
        })
    }

    save(){
        const cliente = this.state.cliente
        const method = cliente.id ? 'put' : 'post'
        const url = cliente.id ? `${baseUrl}${cliente.id}`:`${baseUrl}Insert/`
        axios[method](url,cliente)
        .then(resp =>{
            const list = this.getUpdatedList(resp.data)
            this.setState({list})
        })
    }

    remove(cliente){
        axios.delete(`${baseUrl}${cliente.cliente.id}`)
        .then(resp => {
            const list = this.state.list.filter(c => c.id === cliente.id);
            this.setState({list})
        })
    }
    
    //Elements/Events
    updateField(event){
        console.log('cheguei evento')
        const cliente = {...this.state.cliente}
        cliente[event.target.name] = event.target.value
        this.setState({cliente})
    }

    renderForm(){
return(
    <div className="form">  
        
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Nome</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="nome" 
                    value={this.state.cliente.nome} 
                    onChange={e => this.updateField(e)} 
                    placeholder="Digite o nome..."/>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>CPF</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="cpf" 
                    value={this.state.cliente.cpf} 
                    onChange={e => this.updateField(e)} 
                    placeholder="Digite o CPF..."/>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Data de nascimento</label>
                    <input 
                    type="date" 
                    className="form-control" 
                    name="dataNascimento" 
                    value={this.state.cliente.dataNascimento} 
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
              <th>Nome</th>
              <th>CPF</th>
              <th>data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
  {this.renderRows()}
          </tbody>
        </table>
        )
    }
    renderRows(){
        return this.state.list.map(cliente =>{
            return(
                <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.dataNascimento}</td>
                  <button className='btn btn-warning' onClick={() => this.load({cliente})}>
                    <i className='fa fa-pencil'></i>
                  </button>
                  <button className='btn btn-danger ml-2'  onClick={()=> this.remove({cliente})}>
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