import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {

    renderWeather(cityData){
        const name = cityData.city.name;

        return(
            <tr key={name}>
                <td>{name}</td>
            </tr>
        );
    }

    render() {
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Ville</th>
                        <th>Température</th>
                        <th>Pression</th>
                        <th>Humidité</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

//ES5 syntax
/*function mapStateToProps(state){
    return { weather: state.weather };
}*/

//ES6 syntax
function mapStateToProps({ weather}){
    //es6 syntax is like do : const weather = state.weather
    return{ weather };//{weather} === {weather:weather}
}

export default connect(mapStateToProps)(WeatherList);