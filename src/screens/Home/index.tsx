import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";


export function Home() {
  const [participantArray, setParticipantsArray] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('');


  function handleParticipantAdd() {
    if(participantArray.includes(participantName)) {
      return Alert.alert("Participante já existe", "Já existe um participante na lista com esse nome.");
    };

    setParticipantsArray(prevState => [...participantArray, participantName]);
    setParticipantName('');
    console.log(participantArray)
  }

  function handleRemoveParticipant(name: string) {
    Alert.alert("Remover participante", `Deseja remover o participante ${name}?`,[
      {
        text: 'Sim',
        onPress: () => {
          setParticipantsArray(prevState => prevState.filter(participant => participant !== name));
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]
    )
    console.log(`Você clicou no botão de Remover! ${name}`);
  }

  function getActualDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        {getActualDate()}
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={event => setParticipantName(event)}
          value={participantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participantArray}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
            key={item}
            removeParticipant={() => handleRemoveParticipant(item)}
            name={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />

    </View>
  )
}