import React,{Component} from 'react'
import Main from '../../components/templates/Main'
import axios from 'axios'
import {read,utils} from 'xlsx'
const baseUrl = 'https://localhost:44378/'
const headerProps={
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastrar, deletar, atualizar e consultar clientes'
    
    }

let list =[]
    export default class Filme extends Component{
        state={
            list
        }
       async handler(e){
            const file = e.target.files[0]
            const data = await file.arrayBuffer()
            const workbook = read(data)
            
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData =  utils.sheet_to_json(worksheet)
            console.log(jsonData)
            list = jsonData;
        }
        async sender(e){
         await axios.post(`${baseUrl}FilmeInsert/`,list)
         .then( resp =>{
            list = resp.data;
            })
            
           
        }

        componentDidMount(){
           axios.get(`${baseUrl}FilmeGetAll`)
            .then(resp =>{
                list = resp.data;
                this.setState({list});
            })
        }
        
            renderTable(){
                return(
                    <table className="table ml-4">
                    <thead>
                    <tr>
                      <th>Id</th>
                      <th>Titulo</th>
                      <th>Classificao</th>
                      <th>Lançamento</th>
                    </tr>
                  </thead>
                  <tbody>
          {this.renderRows()}
                  </tbody>
                </table>
                )
            }
            renderRows(){
                return this.state.list.map(list =>{
                    return(
                        <tr key={list.id}>
                        <td>{list.id}</td>
                        <td>{list.titulo}</td>
                        <td>{list.classificacaoIndicativa}</td>
                        <td>{list.lancamento}</td>
                        </tr>
                    )
                })
            }
        
    render(){
        return(
<Main {...headerProps}>
    carregar Filmes
    <div>
        <input type="file" onChange={e=> this.handler(e)}/>
        <button onClick={e => this.sender(e)}>Enviar</button>
    </div>
    {this.renderTable()}
    
</Main>
        )
    }
}