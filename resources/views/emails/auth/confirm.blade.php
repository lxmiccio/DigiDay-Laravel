<html>
  <body>
    <h3>Conferma il tuo Account.</h3>

    <p>È stato creato un Account su DigiDay, per confermarlo utilizza il link sottostante.</p>

    <p>{{url('http://localhost:8000/utente/conferma/' . $user->confirmation_token)}}</p>
  </body>
</html>
