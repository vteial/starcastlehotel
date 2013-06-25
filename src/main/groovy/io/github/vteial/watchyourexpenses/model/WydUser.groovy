package io.github.vteial.watchyourexpenses.model

import groovy.transform.ToString
import groovyx.gaelyk.datastore.Entity
import groovyx.gaelyk.datastore.Key

@ToString
@Entity(unindexed=false)
public class WydUser {
	@Key
	String id

	String password

	String name

	String emailId

	String parentId

	float salary

	Date createTime

	Date updateTime
}
