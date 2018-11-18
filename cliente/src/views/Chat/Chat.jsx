import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

//Conexão do Socket
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://192.168.15.168:4002');

class Chat extends Component {
    adicionarMensagem(mensagem) {
      var joined = this.state.listaMensagem.concat(mensagem);
      this.setState({ listaMensagem: joined })
    }

    auth = undefined;

    constructor() {
      super();
      this.state = {
          username: '',
          message: '',
          listaMensagem: []
      };
      
      socket.on('RECEBE_MENSAGEM', (mensagem) => {
        this.setState({listaMensagem: [...this.state.listaMensagem, mensagem]});
      })
    }

    handleChange(e) {
      let change = {}
      change[e.target.name] = e.target.value
      this.setState(change)
    }

    enviarMensagem = () => {
        socket.emit('ENVIA_MENSAGEM',  {
          "usuario": this.state.username,
          "mensagem": this.state.message
        });
        this.setState({ message: '' })
    }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Chat"
                content={
                  <div>
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nome",
                          name: "username",
                          value: this.state.username,
                          onChange: this.handleChange.bind(this)
                        }
                      ]}
                    />
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Mensagem</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            name="message"
                            value={this.state.message}
                            onChange={this.handleChange.bind(this)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill onClick={ () => this.enviarMensagem() }>
                      Enviar
                    </Button>
                    <div className="clearfix" />
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Mensagens"
                content={
                    <div id='Teste'>
                      {
                        this.state.listaMensagem.map(mensagem =>
                        <div>
                            {mensagem.usuario + " Disse: " + mensagem.mensagem}
                        </div>
                        )
                      }
                    </div>
                }
                />
            </Col>
          </Row>
        </Grid>>
      </div>
    );
  }
}

export default Chat;
