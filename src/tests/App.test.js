import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('1 - Testa os links do Componente App.js', () => {
  it('Verifica se o componente possui um link com o nome Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });
  it('Verifica se o componente possui um link com o nome About', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });
  it('Verifica se o componente possui um link com o nome Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPokemonsLink).toBeInTheDocument();
  });
});
