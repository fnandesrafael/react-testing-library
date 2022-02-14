import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('03 - Testa o componente Favorite Pokémons', () => {
  it(`Verifica se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });
});
