const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor : "#7c7c7c"
  },
  loginScreenContainer: {
    flex: 1,
  },
  LogoContainer: {
    color : "#65107F",   
    marginTop: 35,
    textAlign: "center",

  },
  imageContainer : {

    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redlogoText: {
    color : "#5304d3",
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 0,
    textAlign: "center",
  },
  greenLogoText: {
    color : "#6ae263",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 0,
    marginBottom: 0,
    textAlign: "center",
  },
  purpleLogoText: {
    color : "#65107F",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 0,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    marginTop: 20,
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 1,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 15,
  },
  errorLogin: {
    color : "#ffd6d6",
    fontWeight : 'bold',
    fontSize : 20,
    fontWeight: "800",
    marginTop: 0,
    marginBottom: 0,
    textAlign: "center",
  },
});
export default styles;
