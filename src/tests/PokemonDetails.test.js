import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('07 - Testa o componente PokemonDetails.js', () => {
  it(`Verifica se as informações detalhadas
  do Pokémon selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();

    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });
  it(`Verifica se existe na página uma seção com os
  mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /game locations of pikachu/i }))
      .toBeInTheDocument();
    pokemons[0].foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(screen.queryAllByTestId('location-map')[index]).toHaveAttribute('src', map);
      expect(screen.queryAllByTestId('location-map')[index])
        .toHaveAttribute('alt', 'Pikachu location');
    });
  });
  it('Verifica se a pagina contém um checkbox para favoritar', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByText(/pokémon favoritado\?/i)).toBeInTheDocument();

    expect(screen.getByText(/pokémon favoritado\?/i))
      .toHaveTextContent('Pokémon favoritado?');

    userEvent.click(screen.getByText(/pokémon favoritado\?/i));
    history.push('/favorites');

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
