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
        $user->password  = 'user1@projectname.local';
        $user->save();

        $user = new \App\User();
        $user->id = '2';
        $user->name = 'user2';
        $user->email  = 'user2@projectname.local';
        $user->password  = 'user2@projectname.local';
        $user->save();


        $user = new \App\User();
        $user->id = '3';
        $user->name = 'user3';
        $user->email  = 'user3@projectname.local';
        $user->password  = 'user3@projectname.local';
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
