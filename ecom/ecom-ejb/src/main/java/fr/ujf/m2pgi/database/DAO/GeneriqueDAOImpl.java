package fr.ujf.m2pgi.database.DAO;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 * 
 */

@SuppressWarnings("unchecked")
/**
 *  Created by FAURE Adrien on 22/10/15.
 */
public abstract class GeneriqueDAOImpl<entityType> implements IGeneriqueDAO<entityType> {

	/**
	 *
	 */
	protected Class<entityType> entityClass;

	/**
	 *
	 */
	@PersistenceContext
	protected EntityManager entityManager;

	/**
	 *
	 */
	public GeneriqueDAOImpl() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        entityClass = ((Class<entityType>) pt.getActualTypeArguments()[0]);
	}

	/**
	 *
	 * @param entity
	 * @return
	 */
	@Override
	public entityType create(final entityType entity) {
		entityManager.persist(entity);
		return entity;
	}

	/**
	 *
	 * @param id
	 */
	@Override
	public void delete(Object id) {
		entityManager.remove( entityManager.getReference(entityClass, id));
	}

	/**fflush
	 *
	 *
	 * @param id
	 * @param flush
     */
	@Override
	public void delete(Object id, boolean flush) {
		entityManager.remove( entityManager.getReference(entityClass, id));
		if(flush) entityManager.flush();
	}


	/**
	 *
	 * @param id
	 * @return
	 */
	@Override
	public entityType find(Object id) {
		return (entityType) entityManager.find(entityClass, id);
	}

	/**
	 *
	 * @param id
	 * @return
	 */
	@Override
	public entityType find(Object id, boolean flush) {
		entityType entity = entityManager.find(entityClass, id);
		if(flush) entityManager.flush();
		return entity;
	}


	/**
	 *
	 * @param entity
	 * @return
	 */
	@Override
	public entityType update(entityType entity) {
		return entityManager.merge(entity);
	}


	@Override
	public Long getEntityCount() {
		String q = "SELECT count(e) FROM " +entityClass.getName() + " e";
		Query query = entityManager.createQuery(q);
		
		return (Long) query.getSingleResult();
	}

}
