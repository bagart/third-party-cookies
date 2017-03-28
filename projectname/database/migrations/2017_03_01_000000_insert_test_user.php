<?php

use Illuminate\Database\Migrations\Migration;
class InsertTestUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user = new \App\User();
        $user->id = '1';
        $user->name = 'user1';
        $user->email  = 'user1@projectname.local';
        $user->password  = '$2y$10$MX6r7Wiw0D5POALr7RWrs.1uFl.Jy2Gc1rSB5.eO5aZKEzHVSB/La';
        $user->save();

        $user = new \App\User();
        $user->id = '2';
        $user->name = 'user2';
        $user->email  = 'user2@projectname.local';
        $user->password  = '$2y$10$18mDXz3IT/21tlIGvhT0juEa33jcxvkhBvJHBer69R7kNS06O5.7O';
        $user->save();


        $user = new \App\User();
        $user->id = '3';
        $user->name = 'user3';
        $user->email  = 'user3@projectname.local';
        $user->password  = '$2y$10$ZdiHGNTFY3z9gW.p3cFR9.L20DRPbWaJmNW0lxbM/PGmwWHzIYaG.';
        $user->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
