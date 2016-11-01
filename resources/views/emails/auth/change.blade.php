<html>
  <body>
    <h3>Conferma il tuo nuovo indirizzo Email</h3>

    <br/>

    <p>Salve {{$user->first_name}} {{$user->last_name}},</p>
    <p>L'indirizzo Email associato al tuo Account su DigiDay è stato modificato, per confermarlo utilizza il link sottostante.</p>

    <br/>

    <p>{{url('http://localhost:8000/utente/conferma/' . $user->confirmation_token)}}</p>
  </body>
</html>
