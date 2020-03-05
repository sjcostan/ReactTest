import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class App extends Component {
  state = {
    api: 'https://intense-stream-35672.herokuapp.com/destinations',
    data: [],
    idInput: '',
    showFieldsModal: false,
    onEditMode: false,

    name: '',
    location: '',
    temperature: '',
    height: '',
    difficulty: '',
    about: '',
    duration: '',
    water: '',
    image: '',

  };

  componentDidMount = () => {
    this.getAllDestinations();
  }

  getDestination = () => {
    fetch(`${this.state.api}/${this.state.idInput}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({data: [].concat(responseJson)});
      })
      .catch((error) => {
        console.error(error);
        alert(error)
      });
  };

  getAllDestinations = () => {
    fetch(this.state.api)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({data: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  createDestination = () => {
    fetch(`${this.state.api}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        location: this.state.location,
        temperature: this.state.temperature,
        height: this.state.height,
        difficulty: this.state.difficulty,
        about: this.state.about,
        duration: this.state.duration,
        water: this.state.water,
        image: this.state.image,
      }),
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.error(error);
    });
    this.getAllDestinations();
    this.setState({
      onEditMode: false,
      showFieldsModal: false,
    });
  };

  updateDestination = () => {
    fetch(`${this.state.api}/${this.state.idInput}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        location: this.state.location,
        temperature: this.state.temperature,
        height: this.state.height,
        difficulty: this.state.difficulty,
        about: this.state.about,
        duration: this.state.duration,
        water: this.state.water,
        image: this.state.image,
      }),
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.error(error);
    });
    this.getAllDestinations();
    this.setState({
      onEditMode: false,
      showFieldsModal: false,
    });
  };

  deleteDestination = id => {
    fetch(`${this.state.api}/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.error(error);
    });
    this.getAllDestinations();
  };

  onEdit = data => {
    this.setState({
      idInput: data._id,
      onEditMode: true,
      showFieldsModal: true,
      name: data.name,
      location: data.location,
      temperature: data.temperature,
      height: data.height,
      difficulty: data.difficulty,
      about: data.about,
      duration: data.duration,
      water: data.water,
      image: data.image,
    })
  }
  
  onOpenFields = () => {
    this.setState({showFieldsModal: true});
  };

  onCloseFields = () => {
    this.setState({showFieldsModal: false});
  };

  onIdInput = id => {
    console.log(id)
    this.setState({idInput: id})
  };

  _customTextInput = data => (
    <View style={styles.customTextInput}>
      <Text>{data.label}</Text>
      <TextInput
        placeholder={data.placeholder}
        value={data.value}
        onChangeText={text => this.setState({[data.input]: text})}
        style={styles.textInput}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
            <Text>{'Search by ID:'}</Text>
            <TextInput
              value={this.state.idInput}
              onChangeText={this.onIdInput}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={this.getDestination}>
              <Text>{'Search'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
        <View>
          <TouchableOpacity onPress={this.onOpenFields}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={styles.destinationFlatList}
            // keyExtractor={({item, index}) => `${index}`}
            renderItem={({item}) => (
              <View style={styles.item}>
                <View style={styles.imageWrap}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.imageWrap}
                  />
                </View>
                <View style={styles.contentWrap}>
                  <Text>{item.name}</Text>
                  <Text>{item.location}</Text>
                  <Text>{item.temperature}</Text>
                  <Text>{item.about}</Text>
                  <Text>{item.duration}</Text>
                  <Text>{item.height}</Text>
                  <Text>{item.difficulty}</Text>
                  <Text>{item.water}</Text>
                  <View style={styles.buttonWrap}>
                    <TouchableOpacity onPress={() => this.onEdit(item)} style={styles.editBtn}>
                      <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteDestination(item._id)} style={styles.deleteBtn}>
                      <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        {this.state.showFieldsModal && (
          <View style={styles.modalBackdrop}>
            <View style={styles.fieldsWrap}>
              {this._customTextInput({
                label: 'Name',
                placeholder: 'name',
                value: this.state.name,
                input: 'name',
              })}
              {this._customTextInput({
                label: 'Temperature',
                placeholder: 'temperature',
                value: this.state.temperature,
                input: 'temperature',
              })}
              {this._customTextInput({
                label: 'Location',
                placeholder: 'location',
                value: this.state.location,
                input: 'location',
              })}
              {this._customTextInput({
                label: 'Height',
                placeholder: 'height',
                value: this.state.height.toString(),
                input: 'height',
              })}
              {this._customTextInput({
                label: 'Difficulty',
                placeholder: 'difficulty',
                value: this.state.difficulty.toString(),
                input: 'difficulty',
              })}
              {this._customTextInput({
                label: 'About',
                placeholder: 'about',
                value: this.state.about,
                input: 'about',
              })}
              {this._customTextInput({
                label: 'Duration',
                placeholder: 'duration',
                value: this.state.duration,
                input: 'duration',
              })}
              {this._customTextInput({
                label: 'Water',
                placeholder: 'water',
                value: this.state.water.toString(),
                input: 'water',
              })}
              {this._customTextInput({
                label: 'Image',
                placeholder: 'image',
                value: this.state.image,
                input: 'image',
              })}
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  onPress={
                    this.state.onEditMode
                    ? this.updateDestination
                    : this.createDestination
                  } style={styles.editBtn}>
                  <Text style={styles.btnText}>{this.state.onEditMode ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCloseFields} style={styles.deleteBtn}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  subContainer: {
    height: '90%',
  },
  textInput: {
    width: width * 0.6,
    height: 30,
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
  },
  destinationFlatList: {
    width: '100%',
  },
  item: {
    height: height / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
  },
  imageWrap: {
    height: width / 4.5,
    width: width / 4.5,
  },
  contentWrap: {
    width: '70%',
    alignItems: 'flex-start',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  editBtn: {
    height: 40,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    height: 40,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  fieldsWrap: {
    height: height / 1.75,
    width: width - 60,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  customTextInput: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
})

export default App;
