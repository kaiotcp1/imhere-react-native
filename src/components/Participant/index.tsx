import {View, Text, TouchableOpacity} from 'react-native'
import { styles } from '../../components/Participant/styles'

interface Props {
  removeParticipant: () => void;
  name: string;
}

export function Participant({removeParticipant, name}: Props) {
  return (
  <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

    <View>
      <TouchableOpacity style={styles.button} onPress={removeParticipant}>
        <Text style={styles.buttonText}>
          -
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}