import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from '@react-navigation/elements';
 
const ScreenTemplate = ({ children, headerPadding }) => {
//useHeaderHeight is a hook that gives you the height of the header
const headerHeight = useHeaderHeight();
 
return (
<LinearGradient 
colors={["#8AAAE5","#FCF6F5FF"]}
style={{ flex: 1, paddingTop: headerPadding ? headerHeight : 0 }}
>
 {children}
</LinearGradient>
)
}