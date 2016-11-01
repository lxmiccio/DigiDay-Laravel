<html>
  <body>
    <h3>Modifica la Password</h3>

    <br/>

    <p>Salve {{$user->first_name}} {{$user->last_name}},</p>
    <p>È stato richiesto un cambiamento di Password per il tuo Account su DigiDay, per modificarla utilizza il link sottostante.</p>

    <br/>

    <p>{{url('http://localhost:8000/utente/reimposta/' . $token)}}</p>

    <br/>

    <p>Il link sarà valido solamente per 60 minuti e potrà essere utilizzato solamente una volta.</p>
  </body>
</html>
