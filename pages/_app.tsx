import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { useStore } from '../src/redux/hooks/hooks';
import { ThemeProvider } from '../src/themeContext';
import '../src/App.css';
import ThemeToggleButton from '../src/components/themeToggleButton/themeToggleButton';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <ThemeToggleButton />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default MyApp;
