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
    /**
     * Esta parte do código foi construida a partir do código do aluno Carlos Rosa
     * Source: https://github.com/tryber/sd-017-project-react-testing-library/pull/7
     */
    // Na linha 34, são procurados todas as imagens que possuem o atributo alt Pikachu location, para assim conseguir encontrar apenas as imagens que se tratam das localizações.
    const maps = screen.getAllByAltText('Pikachu location');
    // nas linhas 37 e 38 são feitos os testes de expect, esperando que o atributo src sejam exatamente os do arquivo data.js
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    // Nas linhas 40 e 41 acontecem os mesmos testes, mas apenas esperando que existam os nomes das localizações
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
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
