import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AuthNavbar from "./components/AuthNavbar";
import NoteNavbar from "./components/NoteNavbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import ArchivedPage from "./pages/ArchivedPage";
import PageNotFound from "./pages/PageNotFound";
import { getUserLogged, putAccessToken } from "./utils/api";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from './contexts/ThemeContext';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {  
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          })
        }
      },
        theme: localStorage.getItem('theme') || 'dark',
        toggleTheme: () =>{
          this.setState((prevState)=> {
            const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return {
              theme: newTheme
            };
          });
      },
    }
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render(){
    if (this.state.initializing) {
      return <p className="loading">Loading ...</p>;
    }

    if(this.state.authedUser === null){
      return(
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <header>
                  <h1><Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
                  <AuthNavbar />
              </header>
              <main>
                <Routes>
                  <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                  <Route path='/register' element={<RegisterPage/>}></Route>
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      )
    }

    return(
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
            <div className="app-container">
              <header>
                <h1><Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
                <NoteNavbar logout={this.onLogout} name={this.state.authedUser.name}/>
              </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archived" element={<ArchivedPage />}/>
                <Route path="/add" element={<AddPage />} />
                <Route path="/notes/:id" element={<DetailPage/>}/>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>

    )
  }
}

export default App;