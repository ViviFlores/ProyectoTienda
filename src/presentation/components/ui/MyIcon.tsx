import { Icon } from '@ui-kitten/components';
import React from 'react'
import { styles } from '../../theme/styles';
import { useTheme } from '@ui-kitten/components';

//Definimos su props
interface Props {
    name: string;
    color?: string;
    isWhite?: boolean;
}

export const MyIcon = ({ name, color, isWhite }: Props) => {
    //hook para cambiar estilos de componentes con kitten comp
    const theme = useTheme();

    if (isWhite) {
        color = theme['color-info-100'];
    } else if (!color) {
        color = theme['text-basic-color'];
    } else {
        color = theme[color] ?? theme['text-basic-color'];
    }

    return (
        <Icon
            style={styles.icon}
            fill={color}
            name={name}
        />
    )
}
