Steganografski Messenger
O Steganografiji
Steganografija je veština prikrivanja poruka ili informacija unutar drugih nešto manje očiglednih podataka, čime se omogućava tajno komuniciranje. U ovom projektu, istražujemo tehniku prikrivenog komuniciranja putem umetanja tajnih poruka u slike.

O Aplikaciji
Steganografski Messenger je jednostavna React aplikacija koja omogućava korisnicima da unesu tajnu poruku i umetnu je u crvenu komponentu svake 3600. tačke (LSB bit) crvene boje odabrane slike. Ova tehnika omogućava skrivanje informacija unutar slike bez primetnog gubitka kvaliteta.

Tehnički Detalji
Aplikacija koristi JavaScript i React za izradu korisničkog interfejsa. Prilikom umetanja poruke, aplikacija obrađuje svaki piksel odabrane slike i modifikuje crvenu komponentu tako da predstavlja bajtove tajne poruke. Pri čitanju tajne poruke, aplikacija čita crvenu komponentu svakog 3600. piksela i rekonstruiše tajnu poruku.

Uputstva za Korišćenje
Umetanje Poruke:

Kliknite na dugme "Odaberite sliku" kako biste izabrali sliku u koju želite umetnuti poruku.
Unesite tajnu poruku u predviđeni tekstualni unos.
Kliknite na dugme "Izvezi sliku sa skrivenom porukom" kako biste preuzeli rezultujuću sliku sa umetnutom porukom.
Čitanje Poruke:

Kliknite na dugme "Odaberite sliku" kako biste izabrali sliku sa umetnutom porukom.
Kliknite na dugme "Pročitaj tajnu poruku" kako biste prikazali tajnu poruku iz unete slike.

Znak za Kraj Poruke:
Znak "!" koristi se kao oznaka kraja poruke. Kada se ovaj znak detektuje, čitanje poruke će se zaustaviti, a bilo koji tekst nakon ovog znaka će biti zanemaren.

Napomena: Za najbolje rezultate, koristite visokokvalitetne  PNG slike kako biste izbegli gubitak informacija prilikom umetanja poruke.



