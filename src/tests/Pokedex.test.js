import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('05 - Testa o componente Pokédex.js', () => {
  it(`Verifica se contem um h2 com o texto
  Encountered pokémons`, () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: /encountered pokémons/i }))
      .toBeInTheDocument();
  });
  it(`Verifica se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /próximo pokémon/i }));

    pokemons.forEach((pokemon, index) => {
      if ((pokemons.length - 1) === index) {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
        expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
      } else {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      }
    });
  });
  it('Verifica se há somente um card', () => {
    renderWithRouter(<App />);
    expect(screen.queryAllByTestId('pokemon-card')).toHaveLength(1);
  });
  it('Verifica se há todos os botões de filtragem', () => {
    renderWithRouter(<App />);
    const TYPE_BTN_LENGHT = 7;
    const typeButtons = screen.queryAllByTestId('pokemon-type-button');
    typeButtons.forEach((button) => {
      userEvent.click(button);
      const filteredTypes = pokemons.filter((pokemon) => (
        pokemon.type === button.innerHTML
      ));
      filteredTypes.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      });
      // console.log(filteredTypes);
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    });
    expect(typeButtons).toHaveLength(TYPE_BTN_LENGHT);
  });
  it('Verifica se todos os pokémons voltam ao clicar no botão All', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
});
