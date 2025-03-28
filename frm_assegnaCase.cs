// ...existing code...

// Aggiungiamo una variabile di classe per tenere traccia dell'ultima operazione
private Dictionary<int, int> ultimaAssegnazione = null; // Chiave: ID casa, Valore: proprietario precedente

// ...existing code...

private void InitializeComponent()
{
    // ...existing code...
    
    // Aggiungiamo il pulsante UNDO
    this.btnUndo = new System.Windows.Forms.Button();
    this.btnUndo.Location = new System.Drawing.Point(/* posizionare vicino agli altri pulsanti */);
    this.btnUndo.Name = "btnUndo";
    this.btnUndo.Size = new System.Drawing.Size(80, 30);
    this.btnUndo.TabIndex = /* successivo disponibile */;
    this.btnUndo.Text = "UNDO";
    this.btnUndo.UseVisualStyleBackColor = true;
    this.btnUndo.Click += new System.EventHandler(this.btnUndo_Click);
    this.btnUndo.Enabled = false; // Inizialmente disabilitato fino a quando non viene eseguita un'assegnazione
    
    // Aggiungiamo il controllo alla form
    this.Controls.Add(this.btnUndo);
    
    // ...existing code...
}

// ...existing code...

// Metodo da chiamare dopo ogni assegnazione di casa
private void SalvaOperazionePerUndo(int idCasa, int proprietarioPrecedente)
{
    ultimaAssegnazione = new Dictionary<int, int>();
    ultimaAssegnazione.Add(idCasa, proprietarioPrecedente);
    btnUndo.Enabled = true;
}

// Consolidiamo la logica di aggiornamento del database in una funzione generica
private void AggiornaDatabase(string query, Dictionary<string, object> parametri)
{
    using (SqlConnection conn = new SqlConnection(connectionString))
    {
        conn.Open();
        using (SqlCommand cmd = new SqlCommand(query, conn))
        {
            foreach (var parametro in parametri)
            {
                cmd.Parameters.AddWithValue(parametro.Key, parametro.Value);
            }
            cmd.ExecuteNonQuery();
        }
    }
}

// Gestore dell'evento Click per il pulsante UNDO
private void btnUndo_Click(object sender, EventArgs e)
{
    if (ultimaAssegnazione != null && ultimaAssegnazione.Count > 0)
    {
        try
        {
            int idCasa = ultimaAssegnazione.Keys.First();
            int proprietarioPrecedente = ultimaAssegnazione[idCasa];

            string query = "UPDATE Case SET ID_Proprietario = @ProprietarioPrecedente WHERE ID = @IdCasa";
            var parametri = new Dictionary<string, object>
            {
                { "@ProprietarioPrecedente", proprietarioPrecedente },
                { "@IdCasa", idCasa }
            };
            AggiornaDatabase(query, parametri);

            AggiornaDataGridView();
            MessageBox.Show("Ultima assegnazione annullata con successo.", "Operazione completata", MessageBoxButtons.OK, MessageBoxIcon.Information);

            ultimaAssegnazione = null;
            btnUndo.Enabled = false;
        }
        catch (Exception ex)
        {
            MessageBox.Show("Errore durante l'annullamento dell'operazione: " + ex.Message, "Errore", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}

// ...existing code...

// Modifica della funzione di assegnazione case esistente
private void btnAssegna_Click(object sender, EventArgs e)
{
    // ...existing code...
    
    // Prima di aggiornare il database, salviamo lo stato attuale per l'undo
    int idCasa = /* ID della casa selezionata */;
    int proprietarioPrecedente = /* Valore attuale del proprietario */;
    
    string query = "UPDATE Case SET ID_Proprietario = @NuovoProprietario WHERE ID = @IdCasa";
    var parametri = new Dictionary<string, object>
    {
        { "@NuovoProprietario", /* Nuovo proprietario */ },
        { "@IdCasa", idCasa }
    };
    AggiornaDatabase(query, parametri);

    // Dopo l'aggiornamento riuscito, salva l'operazione per l'undo
    SalvaOperazionePerUndo(idCasa, proprietarioPrecedente);
    
    // ...existing code...
}

// Rimuoviamo funzioni non utilizzate come setDataPath se non necessarie
// ...existing code...
