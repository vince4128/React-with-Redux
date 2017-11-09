import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_maps';

class WeatherList extends Component {

    renderWeather(cityData){
        const name = cityData.city.name;
        const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const {lon, lat} = cityData.city.coord;

        return(
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color="orange" units="C°"/></td>
                <td><Chart data={pressures} color="green" units="hPa"/></td>
                <td><Chart data={humidities} color="black" units="%"/></td>
            </tr>
        );
    }

    render() {
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Ville</th>
                        <th>Température (C°)</th>
                        <th>Pression (hPa)</th>
                        <th>Humidité (%)</th>
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