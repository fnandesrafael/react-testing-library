import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('2 - Testa o arquivo About.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });
  it('Verifica se a página contém as informações sobre a Pokédex.', () => {
    const pokedexText1 = screen.getByText(/this application simulates a pokédex/ig);
    expect(pokedexText1).toBeInTheDocument();

    const pokedexText2 = screen.getByText(/One can filter Pokémons by type/ig);
    expect(pokedexText2).toBeInTheDocument();
  });
  it('Verifica se a página contém um heading h2', () => {
    const pokedexTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(pokedexTitle).toBeInTheDocument();
  });
  it('Verifica se a página contém uma imagem da pokedéx', () => {
    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImg).toBeInTheDocument();

    expect(pokedexImg).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
