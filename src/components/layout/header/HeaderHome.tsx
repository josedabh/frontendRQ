import { Text, View } from 'react-native';

import globalStyles from '../../../shared/themes/styles/globalStyles';
import textStyles from '../../../shared/themes/styles/textStyles';

interface HeaderProps {
  person: string;
}

/**Componente porpio de Home que saluda yu ayuda al usuario */
const HeaderHome: React.FC<HeaderProps> = ({ person }) => {
  return (
    <View style={[globalStyles.card, { display: "flex" }]}>
      <Text style={textStyles.title}> Hola , {person} </Text>
    </View>
  );
};

export default HeaderHome;
