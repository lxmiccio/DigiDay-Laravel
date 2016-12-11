<html>
  <body>
    <h3>Completa la registrazione su DigiDay</h3>

    <br/>

    <p>Salve {{$user->first_name}} {{$user->last_name}},</p>
    <p>È stato creato un nuovo Account su DigiDay, per completare la registrazione utilizza il link sottostante.</p>

    <br/>

    <p>{{url(URL::to('/') . '/utente/conferma/' . $user->confirmation_token)}}</p>
  </body>
</html>
