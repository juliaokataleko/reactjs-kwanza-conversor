import React, { Component } from 'react'
import './Conversor.css';

export default class Conversor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            moedaA_Valor: "",
            moedaB_Valor: 0,
            error: ""
        }

        this.converter = this.converter.bind(this);
    }

    formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            // console.log(e)
        }
    };

    converter() {
        // alert("Converter...")
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=y&apiKey=0d9dfc08b2ef0f82fefb`;

        if (!this.state.moedaA_Valor) this.setState({ error: "Digite um valor por favor." });
        else {
            fetch(url).then(res => {
                return res.json();
            })
                .then(json => {
                    if (!json[de_para]) this.setState({ error: "Houve um erro na API. Tente mais tarde." });
                    else {
                    let cotacao = json[de_para].val;
                    let moedaB_Valor = this.formatMoney((parseFloat(this.state.moedaA_Valor) * cotacao).toFixed(2));

                    this.setState({ error: "" });
                    this.setState({ moedaB_Valor });

                    }

                })
        }
    }

    render() {
        return (
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" placeholder="Digite o valor" onKeyUp={this.converter} onChange={(event) => this.setState({ moedaA_Valor: event.target.value })}></input>
                <input type="button" name="" onClick={this.converter} value="Converter" />
                <span className="error">{this.state.error}</span>
                <p>Valor Convertido: <b>{this.state.moedaB_Valor} { this.props.moedaB } </b> </p>
            </div>
        )
    }
}
