import { Text, View } from 'react-native';

import globalStyles from '../../../shared/themes/styles/globalStyles';
import textStyles from '../../../shared/themes/styles/textStyles';
import createGlobalStyles from '../../../shared/themes/styles/globalStyles';
import { useTheme } from '../../../context/ThemeContext';
import createTextStyles from '../../../shared/themes/styles/textStyles';

interface HeaderProps {
  person: string;
}

/**Componente porpio de Home que saluda yu ayuda al usuario */
const HeaderHome: React.FC<HeaderProps> = ({ person }) => {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);
  const textStyles = createTextStyles(theme);
  return (
    <View style={[globalStyles.card, { display: "flex" }]}>
      <Text style={textStyles.title}> Hola, {person} </Text>
    </View>
  );
};

export default HeaderHome;
