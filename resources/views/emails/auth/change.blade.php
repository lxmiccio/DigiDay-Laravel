<html>
  <body>
    <h3>Conferma la tua nuova Email.</h3>

    <p>È stata modificata la Email associata al tuo Account su DigiDay, per confermarla utilizza il link sottostante.</p>

    <p>{{url('http://localhost:8000/utente/conferma/' . $user->confirmation_token)}}</p>
  </body>
</html>
