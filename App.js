
import React, { Component} from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Weather from '/Users/hannah/Documents/seniorProject/geoWeatherApp/components/Weather';
import { API_KEY } from '/Users/hannah/Documents/seniorProject/geoWeatherApp/utils/WeatherApiKey';
import {weatherConditions} from '/Users/hannah/Documents/seniorProject/geoWeatherApp/utils/WeatherConditions';
export default class App extends React.Component {
        	state = {
    		isLoading: false,
    		temperature: 0,
    		weatherCondition: null,
			error: null
	};


	componentDidMount() {
		Geolocation.getCurrentPosition(
			position => {
				this.fetchWeather(position.coords.latitude, position.coords.longitude);
			},
			error => {
				this.setState({
					error: 'Error Getting Weather Conditions'
				});
			}
		);
	}

	fetchWeather(lat = 25, lon = 25) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
		)
			.then(res => res.json())
			.then(json => {
				this.setState({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
					isLoading: false
				});
			});
	}

	render() {
		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
				{isLoading ? (
					<Text>Fetching The Weather</Text>
				) : (
					<Weather
						weather={this.state.weatherCondition}
						temperature={this.state.temperature}
					/>
				)}
			</View>
		);
	}}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#66A6FF'
	}
});
