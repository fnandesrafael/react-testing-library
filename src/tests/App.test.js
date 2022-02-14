import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('1 - Testa os links do Componente App.js', () => {
  it('Verifica se o componente possui um link com o nome Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });
  it('Verifica se o componente possui um link com o nome About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });
  it('Verifica se o componente possui um link com o nome Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPokemonsLink).toBeInTheDocument();
  });
  it(`Verifica se a aplicação é redirecionada para a
  página inicial ao clicar no botão Home`, () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });
  it(`Verifica se a aplicação é redirecionada para a
  página About ao clicar no botão About`, () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /about/i }));
    expect(history.location.pathname).toBe('/about');

    userEvent.click(screen.getByRole('link', { name: /home/i }));
    expect(history.location.pathname).toBe('/');
  });
  it(`Verifica se a aplicação é redirecionada para a
  página favorites ao clicar no botão Favorites`, () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    expect(history.location.pathname).toBe('/favorites');

    userEvent.click(screen.getByRole('link', { name: /home/i }));
    expect(history.location.pathname).toBe('/');
  });
  it(`Verifica se a aplicação é redirecionada para a
  página notFound ao navegar para uma página inexistente`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    expect(screen.getByRole('heading', { level: 2, name: /Page requested not found/i }))
      .toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: /home/i }));
    expect(history.location.pathname).toBe('/');
  });
});
